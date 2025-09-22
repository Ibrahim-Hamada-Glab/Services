import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../../Services/tasks.service';
import { AddTaskDto } from '../task.model';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');
  private readonly tasksService = inject(TasksService);
  onAddTask(title: string, description: string) {
    this.formEl()?.nativeElement.reset();
    var addTaskDto: AddTaskDto = { title, description };
    this.tasksService.AddTask(addTaskDto);
  }
}
