import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TasksComponent } from './tasks/tasks.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [TasksComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
