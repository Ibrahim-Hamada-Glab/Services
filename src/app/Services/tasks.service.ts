import { computed, Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { AddTaskDto, Task, TaskStatus } from '../tasks/task.model';
import { GuidGenerator } from '../Shared/GuidGenrator';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private _tasks = signal<Task[]>([]);
  private _isSaving = signal<boolean>(false);
  private _isSavingError = signal<boolean>(false);
  private _selectedFilter = signal<string>('ALL');

  public readonly isSaving = computed(() => this._isSaving());
  public readonly isSavingError = computed(() => this._isSavingError());
  public readonly tasksList = computed(() => this._tasks());
  public readonly filteredTasks = computed(() => {
    const selected = this._selectedFilter();
    if (selected === 'ALL') {
      return this._tasks();
    }
    return this._tasks().filter((task) => task.status === selected);
  });
  public readonly selectedFilter = computed(() => this._selectedFilter());
  constructor() {}

  public AddTask(addedTask: AddTaskDto): void {
    this._isSaving.set(true);
    const id = GuidGenerator.newGuid();

    this._tasks.update((tasks) => [
      ...tasks,
      { ...addedTask, id, status: 'OPEN' },
    ]);
    this._isSaving.set(false);
  }

  public UpdateTaskStatus(taskId: string, newStatus: TaskStatus): void {
    this._tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    this._isSaving.set(false);
  }

  public SetSelectedFilter(filter: string): void {
    this._selectedFilter.set(filter);
  }
}
