import { Injectable } from '@angular/core';
import { from, map, catchError, of } from 'rxjs';
import { SupabaseService } from './db/supabase.service';

export interface GeneratedDocument {
  id: string;
  user_id: string;
  type: 'resume' | 'cover_letter' | 'interview_plan';
  title: string;
  content: string;
  metadata: any;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  constructor(private supabase: SupabaseService) {}

  saveDocument(document: Omit<GeneratedDocument, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: any; error: any }> {
    return this.supabase.client
      .from('generated_documents')
      .insert({
        ...document,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
  }

  getDocumentsByType(type: string): Promise<{ data: any; error: any }> {
    if (!this.supabase.currentUser?.id) {
      return Promise.resolve({ data: null, error: new Error('User not authenticated') });
    }

    return this.supabase.client
      .from('generated_documents')
      .select('*')
      .eq('user_id', this.supabase.currentUser.id)
      .eq('type', type)
      .order('created_at', { ascending: false });
  }

  deleteDocument(documentId: string): Promise<{ error: any }> {
    return this.supabase.client
      .from('generated_documents')
      .delete()
      .eq('id', documentId);
  }

  saveDocumentToLocalStorage(document: any): void {
    const key = `document_${document.type}_${Date.now()}`;
    localStorage.setItem(key, JSON.stringify(document));
  }

  getDocumentsFromLocalStorage(type: string): any[] {
    const documents = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(`document_${type}_`)) {
        const document = localStorage.getItem(key);
        if (document) {
          documents.push(JSON.parse(document));
        }
      }
    }
    return documents.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }
}