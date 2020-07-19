import {
  trigger,
  state,
  query,
  animateChild,
  group,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('HomePage <=> ConfigPage', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ left: '-100%' })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('1000ms ease-out', style({ left: '100%' }))]),
      query(':enter', [animate('1000ms ease-out', style({ left: '0%' }))]),
    ]),
    query(':enter', animateChild()),
  ]),

  transition('* <=> FilterPage', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ left: '-100%' })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('1000ms ease-out', style({ left: '100%' }))]),
      query(':enter', [animate('1000ms ease-out', style({ left: '0%' }))]),
    ]),
    query(':enter', animateChild()),
  ]),
]);
