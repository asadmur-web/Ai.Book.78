// Fix: Provide full content for types.ts
export enum Tool {
  ExamMaker = 'صانع الاختبارات',
  LessonExplainer = 'شرح الدروس',
  ProjectBuilder = 'باني المشاريع',
}

export enum Difficulty {
  Easy = 'سهل',
  Medium = 'متوسط',
  Hard = 'صعب',
}

export enum ExamType {
  MultipleChoice = 'اختيار من متعدد',
  FillInTheBlank = 'املأ الفراغ',
  TrueFalse = 'صح / خطأ',
  Mixed = 'مختلط',
}

export interface ExamQuestion {
  question: string;
  type: 'multiple-choice' | 'fill-in-the-blank' | 'true-false';
  options?: string[];
  answer: string;
}
