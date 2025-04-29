import dayjs from 'dayjs';
import 'dayjs/locale/pl';

dayjs.locale('pl');

import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
dayjs.extend(weekday);
dayjs.extend(localeData);

export default dayjs;