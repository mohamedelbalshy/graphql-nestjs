import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { StudentService } from 'src/student/student.service';
import { AssignStudentToLessonInput } from './assignStudentsToLesson.input';
import { CreateLessonInput } from './createLesson.input';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private readonly lessonService: LessonService,
    private readonly studentService: StudentService,
  ) {}
  @Query((returns) => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLessonById(id);
  }

  @Query((returns) => [LessonType])
  lessons() {
    return this.lessonService.lessons();
  }

  @Mutation((returns) => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation((returns) => LessonType)
  assignStudentsToLessonInput(
    @Args('assignStudentsToLessonInput')
    assignStudentsToLessonInput: AssignStudentToLessonInput,
  ) {
    return this.lessonService.assignStudentToLesson(
      assignStudentsToLessonInput,
    );
  }

  @ResolveField()
  async students(@Parent() lesson: LessonType) {
    return this.studentService.studentsByIds(lesson.students);
  }
}
