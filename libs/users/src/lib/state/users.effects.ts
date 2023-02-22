// import { Injectable } from '@angular/core';
// import { fetch } from '@nrwl/angular';
// import { Actions } from '@ngrx/effects';

// import * as UsersFeature from './users.reducer';
// import * as UsersActions from './users.actions';
// import { catchError, concatMap, map } from 'rxjs/operators';
// import { LocalstorageService } from '../services/localstorage.service';
// import { of } from 'rxjs';
// import { UsersService } from '../services/users.service';
// import { ActionCreator } from '@ngrx/store';
// import { TypedAction } from '@ngrx/store/src/models';

// @Injectable()
// export class UsersEffects {
//   buildUserSession$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(UsersActions.buildUserSession),
//       concatMap(() => {
//         if (this.localstorageService.isValidToken()) {
//           const userId = this.localstorageService.getUserIdFromTocken();
//           if (userId) {
//             return this.usersService.getUser(userId).pipe(
//               map((user) => {
//                 return UsersActions.buildUserSessionSuccess({ user: user });
//               }),
//               catchError(() => of(UsersActions.buildUserSessionFailed()))
//             );
//           } else {
//             return of(UsersActions.buildUserSessionFailed());
//           }
//         } else {
//           return of(UsersActions.buildUserSessionFailed());
//         }
//       })
//     )
//   );

//   constructor(
//     private actions$: Actions,
//     private localstorageService: LocalstorageService,
//     private usersService: UsersService
//   ) {}
// }
// function createEffect(arg0: () => any) {
//   throw new Error('Function not implemented.');
// }

// function ofType(buildUserSession: ActionCreator<"[Users] Build User Session", () => TypedAction<"[Users] Build User Session">>): any {
//   throw new Error('Function not implemented.');
// }

