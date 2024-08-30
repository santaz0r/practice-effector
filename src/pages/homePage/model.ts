import { routes } from '../../app/routes/router';

export const currentRoute = routes.home;

currentRoute.opened.watch(() => console.log('home opened')); // watch используют "тупо для логирования"
