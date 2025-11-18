import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FileProcessorService {
  
    async extractTextFromFile(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          
          reader.onload = async (e) => {
            try {
              if (file.type === 'application/pdf') {
                const arrayBuffer = e.target?.result as ArrayBuffer;
                resolve(await this.extractTextFromPDF(arrayBuffer));
              } else if (file.type.includes('word') || file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
                const arrayBuffer = e.target?.result as ArrayBuffer;
                resolve(await this.extractTextFromWord(arrayBuffer));
              } else {
                const content = e.target?.result as string;
                resolve(content);
              }
            } catch (error) {
              reject(error);
            }
          };
          
          reader.onerror = reject;
          
          if (file.type === 'application/pdf' || file.type.includes('word')) {
            reader.readAsArrayBuffer(file);
          } else {
            reader.readAsText(file, 'UTF-8');
          }
        });
      }
      
    private async extractTextFromWord(arrayBuffer: ArrayBuffer): Promise<string> {
    return "Текст из Word документа (требуется установка mammoth.js)";
    }
  private async extractTextFromPDF(arrayBuffer: ArrayBuffer): Promise<string> {
    return "Текст из PDF файла (требуется установка pdf.js)";
  }
}