import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStudentInput } from './createStudent.input';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation((returns) => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.createStudent(createStudentInput);
  }

  @Query((returns) => [StudentType])
  async students() {
    return this.studentService.students();
  }

  @Query((returns) => StudentType)
  async student(@Args('id') id: string) {
    return this.studentService.student(id);
  }
}
