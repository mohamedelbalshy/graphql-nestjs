import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { AssignStudentToLessonInput } from './assignStudentsToLesson.input';
import { CreateLessonInput } from './createLesson.input';
import { Lesson } from './lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = createLessonInput;

    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students,
    });

    return this.lessonRepository.save(lesson);
  }

  async getLessonById(id: string) {
    const lesson = await this.lessonRepository.findOne({ id });
    if (!lesson) throw new NotFoundException();

    return lesson;
  }

  async lessons() {
    const lessons = await this.lessonRepository.find();

    return lessons;
  }

  async assignStudentToLesson(
    assignStudentsToLessonInput: AssignStudentToLessonInput,
  ): Promise<Lesson> {
    const { lessonId, studentIds } = assignStudentsToLessonInput;
    const lesson = await this.lessonRepository.findOne({ id: lessonId });

    if (!lesson) {
      throw new NotFoundException(
        `This Lesson with ID "${lessonId}" not found!`,
      );
    }

    lesson.students = [...lesson.students, ...studentIds];
    return this.lessonRepository.save(lesson);
  }
}
