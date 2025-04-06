import { faker } from '@faker-js/faker';

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  avatar: string;
  email: string;
  course: string;
  semester: number;
  attendance: number;
  behaviorScore: number;
  personalityTraits: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
  academicScore: number;
  participationScore: number;
  behavioralIncidents: Array<{
    id: string;
    date: string;
    type: 'Minor' | 'Major';
    description: string;
    action: string;
    teacher: string;
  }>;
  strengths: string[];
  areasOfImprovement: string[];
  counselorNotes: string;
}

export interface Teacher {
  id: string;
  name: string;
  avatar: string;
  email: string;
  department: string;
  subject: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  subject: string;
  color: string;
  pendingAssignments: number;
}

// Generate random behavioral incidents
const generateIncidents = (count: number) => {
  const incidents = [];
  const incidentTypes = [
    'Late to class',
    'Missing homework',
    'Disruptive behavior',
    'Using phone during class',
    'Unexcused absence',
    'Cheating attempt',
    'Disrespectful to peers',
    'Disrespectful to teacher',
    'Dress code violation',
    'Sleeping in class'
  ];
  
  const actions = [
    'Verbal warning',
    'Written warning',
    'Parent notification',
    'Counselor referral',
    'Detention',
    'Suspension',
    'Meeting with dean'
  ];
  
  const teachers = [
    'Dr. Ramesh Kumar',
    'Prof. Sanjay Patel',
    'Dr. Priya Sharma',
    'Prof. Ajay Singh',
    'Dr. Neha Gupta',
    'Prof. Anita Desai'
  ];
  
  for (let i = 0; i < count; i++) {
    const isMinor = Math.random() > 0.3;
    incidents.push({
      id: faker.string.uuid(),
      date: faker.date.recent({ days: 90 }).toISOString().split('T')[0],
      type: isMinor ? 'Minor' : 'Major',
      description: faker.helpers.arrayElement(incidentTypes),
      action: faker.helpers.arrayElement(actions),
      teacher: faker.helpers.arrayElement(teachers)
    });
  }
  
  return incidents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Generate random strengths
const generateStrengths = () => {
  const strengths = [
    'Critical thinking',
    'Problem-solving',
    'Teamwork',
    'Leadership',
    'Communication',
    'Creativity',
    'Attention to detail',
    'Time management',
    'Adaptability',
    'Analytical thinking',
    'Enthusiasm',
    'Persistence'
  ];
  
  const count = faker.number.int({ min: 2, max: 5 });
  return faker.helpers.arrayElements(strengths, count);
};

// Generate random areas of improvement
const generateAreasOfImprovement = () => {
  const areas = [
    'Time management',
    'Note-taking skills',
    'Participation in class',
    'Homework completion',
    'Test preparation',
    'Group work',
    'Written communication',
    'Oral presentation',
    'Focus and attention',
    'Organization',
    'Self-motivation',
    'Stress management'
  ];
  
  const count = faker.number.int({ min: 2, max: 4 });
  return faker.helpers.arrayElements(areas, count);
};

// Generate random student data
export const generateStudents = (count: number): Student[] => {
  const students = [];
  
  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    
    students.push({
      id: faker.string.uuid(),
      name: `${firstName} ${lastName}`,
      rollNumber: `R${faker.number.int({ min: 1000, max: 9999 })}`,
      avatar: faker.image.avatar(),
      email: faker.internet.email({ firstName, lastName, provider: 'asbm.ac.in' }),
      course: faker.helpers.arrayElement([
        'Computer Science',
        'Business Administration',
        'Financial Accounting',
        'Marketing',
        'Human Resources',
        'Data Science'
      ]),
      semester: faker.number.int({ min: 1, max: 8 }),
      attendance: faker.number.int({ min: 60, max: 100 }),
      behaviorScore: faker.number.int({ min: 60, max: 100 }),
      personalityTraits: {
        openness: faker.number.int({ min: 1, max: 100 }),
        conscientiousness: faker.number.int({ min: 1, max: 100 }),
        extraversion: faker.number.int({ min: 1, max: 100 }),
        agreeableness: faker.number.int({ min: 1, max: 100 }),
        neuroticism: faker.number.int({ min: 1, max: 100 })
      },
      academicScore: faker.number.int({ min: 50, max: 100 }),
      participationScore: faker.number.int({ min: 50, max: 100 }),
      behavioralIncidents: generateIncidents(faker.number.int({ min: 0, max: 6 })),
      strengths: generateStrengths(),
      areasOfImprovement: generateAreasOfImprovement(),
      counselorNotes: faker.helpers.maybe(() => faker.lorem.paragraph(), { probability: 0.7 }) || ''
    });
  }
  
  return students;
};

// Generate random teacher data
export const generateTeachers = (count: number): Teacher[] => {
  const teachers = [];
  
  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    
    teachers.push({
      id: faker.string.uuid(),
      name: `Dr. ${firstName} ${lastName}`,
      avatar: faker.image.avatar(),
      email: faker.internet.email({ firstName, lastName, provider: 'asbm.ac.in' }),
      department: faker.helpers.arrayElement([
        'Computer Science',
        'Business Administration',
        'Finance',
        'Marketing',
        'Human Resources',
        'Data Science'
      ]),
      subject: faker.helpers.arrayElement([
        'Programming Fundamentals',
        'Database Systems',
        'Marketing Management',
        'Financial Accounting',
        'Human Resource Management',
        'Business Statistics',
        'Organizational Behavior'
      ])
    });
  }
  
  return teachers;
};

// Generate courses
export const generateCourses = (count: number): Course[] => {
  const courses = [];
  const colors = ['#4285F4', '#0F9D58', '#DB4437', '#F4B400'];
  
  for (let i = 0; i < count; i++) {
    courses.push({
      id: faker.string.uuid(),
      title: faker.helpers.arrayElement([
        'Introduction to Computer Science',
        'Business Administration',
        'Financial Accounting',
        'Marketing Fundamentals',
        'Data Structures & Algorithms',
        'Human Resource Management',
        'Operating Systems',
        'Database Management',
        'Digital Marketing',
        'Corporate Finance'
      ]),
      instructor: faker.helpers.arrayElement([
        'Dr. Ramesh Kumar',
        'Prof. Sanjay Patel',
        'Dr. Priya Sharma',
        'Prof. Ajay Singh',
        'Dr. Neha Gupta',
        'Prof. Anita Desai'
      ]),
      subject: faker.helpers.arrayElement([
        'Computer Science',
        'Management',
        'Finance',
        'Marketing',
        'Human Resources'
      ]),
      color: faker.helpers.arrayElement(colors),
      pendingAssignments: faker.number.int({ min: 0, max: 4 })
    });
  }
  
  return courses;
};

// Store the generated data to keep it consistent
const mockStudents = generateStudents(50);
const mockTeachers = generateTeachers(15);
const mockCourses = generateCourses(12);

export { mockStudents, mockTeachers, mockCourses };
