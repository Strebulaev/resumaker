import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Translation } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class PrimeNGTranslationService {

  constructor(private translate: TranslateService) {
    // Update PrimeNG translations when language changes
    this.translate.onLangChange.subscribe(() => {
      this.updatePrimeNGTranslations();
    });
  }

  private updatePrimeNGTranslations(): void {
    const currentLang = this.translate.currentLang || this.translate.defaultLang || 'en';
    const translations = this.getTranslationsForLang(currentLang);

    // Update PrimeNG translations
    this.translate.setTranslation(currentLang, { PRIMENG: translations }, true);
  }

  private getTranslationsForLang(lang: string): any {
    if (lang === 'ru') {
      return {
        accept: 'Да',
        reject: 'Нет',
        choose: 'Выбрать',
        upload: 'Загрузить',
        cancel: 'Отмена',
        dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        today: 'Сегодня',
        clear: 'Очистить',
        weekHeader: 'Нед',
        firstDayOfWeek: 1,
        dateFormat: 'dd.mm.yy',
        weak: 'Слабый',
        medium: 'Средний',
        strong: 'Сильный',
        passwordPrompt: 'Введите пароль'
      };
    } else {
      return {
        accept: 'Yes',
        reject: 'No',
        choose: 'Choose',
        upload: 'Upload',
        cancel: 'Cancel',
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Today',
        clear: 'Clear',
        weekHeader: 'Wk',
        firstDayOfWeek: 0,
        dateFormat: 'mm/dd/yy',
        weak: 'Weak',
        medium: 'Medium',
        strong: 'Strong',
        passwordPrompt: 'Enter a password'
      };
    }
  }
}