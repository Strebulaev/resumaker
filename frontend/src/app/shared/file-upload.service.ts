import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FileUploadState {
  fieldName: string;
  file: File | null;
  progress: number;
  status: 'idle' | 'uploading' | 'success' | 'error';
}

@Injectable({ providedIn: 'root' })
export class FileUploadService {
  private uploadStates = new BehaviorSubject<Map<string, FileUploadState>>(new Map());
  
  getUploadState(fieldName: string): FileUploadState | undefined {
    return this.uploadStates.value.get(fieldName);
  }

  setUploadState(fieldName: string, state: Partial<FileUploadState>): void {
    const currentStates = new Map(this.uploadStates.value);
    const existingState = currentStates.get(fieldName) || {
      fieldName,
      file: null,
      progress: 0,
      status: 'idle'
    };
    
    currentStates.set(fieldName, { ...existingState, ...state });
    this.uploadStates.next(currentStates);
    
    console.log(`File upload state updated for ${fieldName}:`, state);
  }

  clearUploadState(fieldName: string): void {
    const currentStates = new Map(this.uploadStates.value);
    currentStates.delete(fieldName);
    this.uploadStates.next(currentStates);
    
    console.log(`File upload state cleared for ${fieldName}`);
  }
}