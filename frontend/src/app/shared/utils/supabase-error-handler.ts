import { PostgrestError } from '@supabase/supabase-js';

export function handleSupabaseError(error: PostgrestError): string {
  switch (error.code) {
    case 'PGRST116':
      return 'Запись не найдена';
    case '23505':
      return 'Дублирующаяся запись';
    case '42501':
      return 'Ошибка прав доступа';
    default:
      return error.message || 'Неизвестная ошибка';
  }
}