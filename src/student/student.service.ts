import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateStudentInput } from './createStudent.input';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
    const { firstName, lastName } = createStudentInput;

    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });

    return this.studentRepository.save(student);
  }

  async getStudentById(id: string) {
    const student = await this.studentRepository.findOne({ id });
    if (!student) throw new NotFoundException();

    return student;
  }

  async students() {
    const students = await this.studentRepository.find();

    return students;
  }

  async student(id: string) {
    const student = await this.studentRepository.findOne({ id });
    if (!student) {
      throw new NotFoundException();
    }

    return student;
  }

  async studentsByIds(studentIds: string[]) {
    const students = await this.studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        },
      },
    });

    return students;
  }
}
