import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import utc from 'dayjs/plugin/utc';

dayjs.locale('pl');
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(utc);

export default dayjs;