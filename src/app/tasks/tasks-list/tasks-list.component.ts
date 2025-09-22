import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../../Services/tasks.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent {
  private readonly tasksService = inject(TasksService);
  selectedFilter = this.tasksService.selectedFilter;
  tasks = this.tasksService.filteredTasks;
  onChangeTasksFilter(filter: string) {
    this.tasksService.SetSelectedFilter(filter.toUpperCase());

    console.log(this.tasks());
  }
}
