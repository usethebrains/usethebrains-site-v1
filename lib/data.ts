'use client';

import { useState, useEffect } from 'react';
import { SWRConfig } from 'swr';

// Type definitions
interface HelpData {
  categories: {
    title: string;
    icon: string;
    articles: {
      title: string;
      href: string;
      lastUpdated: string;
      content: string;
    }[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  support: {
    hours: {
      email: {
        hours: string;
        response: string;
        priority: string;
      };
      phone: {
        hours: string;
        response: string;
      };
      chat: {
        hours: string;
        response: string;
      };
    };
    contacts: {
      email: string;
      phone: string;
    };
    locations: {
      city: string;
      address: string;
      phone: string;
    }[];
  };
}

interface CoursesJson {
  courses: Course[];
}

// Data mapping type
type DataMap = {
  courses: CoursesJson;
  student: StudentUser;
  creator: CreatorUser;
  community: any; // Define proper community data structure if needed
  help: HelpData;
};

interface CommunityInvite {
  id: string;
  email: string;
  sentAt: string;
  status: string;
}

interface CommunityStats {
  totalMembers: number;
  activeToday: number;
  newThisWeek: number;
}

interface StudentUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string;
  role: string;
  joined_date: string;
  subscription: {
    plan: string;
    status: string;
    start_date: string;
    renewal_date: string;
  };
  profile: {
    bio: string;
    location: string;
    interests: string[];
    education: {
      level: string;
      field: string;
      school: string;
    };
  };
  learning_stats: {
    total_courses_enrolled: number;
    courses_completed: number;
    total_learning_hours: number;
    streak_days: number;
    certificates_earned: number;
    average_rating_given: number;
  };
  preferences: {
    email_notifications: {
      course_updates: boolean;
      learning_reminders: boolean;
      achievement_alerts: boolean;
    };
    learning_preferences: {
      preferred_content_type: string;
      weekly_study_goal: number;
    };
    accessibility: {
      captions_enabled: boolean;
      high_contrast: boolean;
      font_size: string;
    };
  };
  enrolled_courses: string[];
  purchased_courses: string[];
  completed_courses: string[];
  certificates: any[];
}

interface CreatorUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string;
  role: string;
  joined_date: string;
  subscription: {
    plan: string;
    status: string;
    start_date: string;
    renewal_date: string;
  };
  profile: {
    title: string;
    bio: string;
    company: string;
    website: string;
    expertise: string[];
  };
  teaching_stats: {
    total_students: number;
    student_satisfaction: number;
    total_courses: number;
    total_teaching_hours: number;
    total_reviews: number;
    average_rating: number;
  };
  creator_analytics: {
    monthly_revenue: {
      current: number;
      growth: number;
    };
    student_engagement: {
      completion_rate: number;
      average_watch_time: number;
    };
    popular_topics: {
      name: string;
      students: number;
      rating: number;
    }[];
  };
  preferences: {
    course_defaults: {
      language: string;
      difficulty: string;
    };
    notification_settings: {
      new_reviews: boolean;
      course_performance: boolean;
      student_messages: boolean;
    };
    payout_method: {
      type: string;
      frequency: string;
      threshold: number;
    };
  };
  earnings: {
    pending: number;
    last_payout: {
      date: string;
      amount: number;
    };
  };
  courses: CreatorCourse[];
}

interface CreatorCourse {
  id: string;
  title: string;
  status: "published" | "draft";
  students?: number;
  revenue?: number;
  rating?: number;
  completion?: number;
}

interface EnrolledCourse {
  id: string;
  title: string;
  progress?: number;
  current_module?: number;
}

interface CreatorAnalytics {
  monthly_revenue: {
    current: number;
    growth: number;
  };
  student_engagement: {
    completion_rate: number;
    average_watch_time: number;
  };
  popular_topics: {
    name: string;
    students: number;
    rating: number;
  }[];
}

interface CommunityPostAttachment {
  id: string;
  type: 'image' | 'video' | 'document' | 'link';
  url: string;
  name: string;
  title?: string;
  size?: number;
}

interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  attachments?: CommunityPostAttachment[];
  tags?: string[];
  isPinned?: boolean;
}

interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location?: string;
  isVirtual: boolean;
  attendees: number;
  maxAttendees?: number;
  organizer: {
    id: string;
    name: string;
    avatar: string;
  };
}

interface CommunityResource {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'link' | 'template';
  url: string;
  uploadedBy: {
    id: string;
    name: string;
    avatar: string;
  };
  uploadedAt: string;
  downloads: number;
  tags?: string[];
}

interface CommunityMember {
  userId: string;
  userName: string;
  userAvatar: string;
  role: 'admin' | 'moderator' | 'member';
  joinedAt: string;
  isActive: boolean;
}

type MemberRole = 'admin' | 'moderator' | 'member';

interface CommunityFollower {
  userId: string;
  userName: string;
  userAvatar: string;
  followedAt: string;
}

interface CommunityData {
  id: string;
  name: string;
  description: string;
  avatar: string;
  bannerUrl?: string;
  memberCount: number;
  followerCount: number;
  category?: string;
  isPrivate: boolean;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
    avatar: string;
  };
  userRole?: MemberRole;
  members: CommunityMember[];
  followers: CommunityFollower[];
  posts: CommunityPost[];
  events: CommunityEvent[];
  resources: CommunityResource[];
  invites: CommunityInvite[];
  stats: CommunityStats;
  tags?: string[];
  rules?: string[];
  socialLinks?: Record<string, string>;
}

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

interface QuizContent {
  question: string;
  options: QuizOption[];
  explanation?: string;
  points: number;
  showExplanation: boolean;
  allowRetry: boolean;
  timeLimit?: number;
  passingScore?: number;
  feedback?: {
    correct: string;
    incorrect: string;
  };
  hints?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  tags?: string[];
}

interface Lesson {
  title: string;
  type: string;
  content?: string | QuizContent;
  videoUrl?: string;
  duration: string;
  preview?: boolean;
}

interface Module {
  title: string;
  lessons: Lesson[];
  preview?: boolean;
}

interface CourseContent {
  modules: Module[];
}

interface Enrollment {
  status: string;
  deadline: string;
  max_students: number;
  available_seats: number;
  batch_start: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: {
    id: string;
    avatar_url: string;
    first_name: string;
    last_name: string;
    title: string;
    bio: string;
    expertise: string[];
    total_students: number;
    total_courses: number;
    average_rating: number;
  };
  thumbnail_url: string;
  duration: {
    blended: string;
    video: string;
    text: string;
    total_lessons: number;
    total_modules: number;
  };
  level: string;
  price: number;
  is_free: boolean;
  rating: number;
  review_count: number;
  enrolled_count: number;
  category: string;
  completion_rate: number;
  language: string;
  subtitles: string[];
  subscription_required: string;
  prerequisites: string[];
  skills_gained: string[];
  certification: {
    available: boolean;
    accredited: boolean;
    validity: string;
  };
  support: {
    community_access: boolean;
    instructor_qa: boolean;
    office_hours: string;
    response_time: string;
  };
  content: CourseContent;
  enrollment: Enrollment;
  last_updated: string;
  progress?: number;
  last_accessed?: string;
  current_module?: number;
}

// Export types for use in other components
export type { 
  StudentUser,
  CreatorUser,
  CreatorCourse,
  EnrolledCourse,
  CreatorAnalytics,
  Course, 
  QuizContent, 
  QuizOption, 
  Lesson, 
  Module, 
  CourseContent, 
  Enrollment,
  CommunityData,
  CommunityPost,
  CommunityEvent,
  CommunityResource,
  CommunityMember,
  CommunityFollower,
  CommunityPostAttachment,
  MemberRole,
  CommunityInvite,
  CommunityStats
};

// Mock data for server-side rendering
const mockStudentData: StudentUser = {
  id: '',
  first_name: '',
  last_name: '',
  email: '',
  avatar_url: '',
  role: 'student',
  joined_date: '',
  subscription: {
    plan: '',
    status: '',
    start_date: '',
    renewal_date: ''
  },
  profile: {
    bio: '',
    location: '',
    interests: [],
    education: {
      level: '',
      field: '',
      school: ''
    }
  },
  learning_stats: {
    total_courses_enrolled: 0,
    courses_completed: 0,
    total_learning_hours: 0,
    streak_days: 0,
    certificates_earned: 0,
    average_rating_given: 0
  },
  preferences: {
    email_notifications: {
      course_updates: false,
      learning_reminders: false,
      achievement_alerts: false
    },
    learning_preferences: {
      preferred_content_type: '',
      weekly_study_goal: 0
    },
    accessibility: {
      captions_enabled: false,
      high_contrast: false,
      font_size: 'medium'
    }
  },
  enrolled_courses: [],
  purchased_courses: [],
  completed_courses: [],
  certificates: []
};

const mockCreatorData: CreatorUser = {
  id: '',
  first_name: '',
  last_name: '',
  email: '',
  avatar_url: '',
  role: 'creator',
  joined_date: '',
  subscription: {
    plan: '',
    status: '',
    start_date: '',
    renewal_date: ''
  },
  profile: {
    title: '',
    bio: '',
    company: '',
    website: '',
    expertise: []
  },
  teaching_stats: {
    total_students: 0,
    student_satisfaction: 0,
    total_courses: 0,
    total_teaching_hours: 0,
    total_reviews: 0,
    average_rating: 0
  },
  creator_analytics: {
    monthly_revenue: {
      current: 0,
      growth: 0
    },
    student_engagement: {
      completion_rate: 0,
      average_watch_time: 0
    },
    popular_topics: []
  },
  preferences: {
    course_defaults: {
      language: '',
      difficulty: ''
    },
    notification_settings: {
      new_reviews: false,
      course_performance: false,
      student_messages: false
    },
    payout_method: {
      type: '',
      frequency: '',
      threshold: 0
    }
  },
  earnings: {
    pending: 0,
    last_payout: {
      date: '',
      amount: 0
    }
  },
  courses: []
};

const mockCourses: Course[] = [];

// Helper function to get data by filename
const getDataByFilename = async <K extends keyof DataMap>(filename: K): Promise<DataMap[K]> => {
  switch (filename) {
    case 'courses':
      const coursesData = await import('../data/courses.json');
      return coursesData.default as unknown as DataMap[K];
    case 'student':
      const studentData = await import('../data/student.json');
      return studentData.default as unknown as DataMap[K];
    case 'creator':
      const creatorData = await import('../data/creator.json');
      return creatorData.default as unknown as DataMap[K];
    case 'community':
      const communityData = await import('../data/community.json');
      return communityData.default as unknown as DataMap[K];
    case 'help':
      const helpData = await import('../data/help.json');
      return helpData.default as unknown as DataMap[K];
    default:
      throw new Error(`Unknown filename: ${filename}`);
  }
};

// Helper function to simulate data fetching with a delay
const fetchData = async <K extends keyof DataMap>(filename: K): Promise<DataMap[K]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    const data = await getDataByFilename(filename);
    return data;
  } catch (error) {
    console.error(`Error loading ${filename}.json:`, error);
    throw error;
  }
};

// Central data management functions
export function useCourses(role?: 'student' | 'creator') {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchData<'courses'>('courses')
      .then((data) => {
        setCourses((data.courses as unknown as Course[]) || []);
        setIsLoading(false);
      })
      .catch(err => {
        setCourses([]);
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return { courses, isLoading, error };
}

export function useUserData(role: 'student' | 'creator' = 'student') {
  const [data, setData] = useState<StudentUser | CreatorUser>(role === 'creator' ? mockCreatorData : mockStudentData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchData<typeof role>(role)
      .then(userData => {
        setData(userData);
        setIsLoading(false);
      })
      .catch(err => {
        setData(role === 'creator' ? mockCreatorData : mockStudentData);
        setError(err);
        setIsLoading(false);
      });
  }, [role]);

  return { data, isLoading, error };
}

// Export both the hook and the non-hook version
export function useUserCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchData<'student'>('student'), fetchData<'courses'>('courses')])
      .then(([userData, coursesData]) => {
        const filteredCourses = (coursesData.courses as unknown as Course[]).filter((course: Course) => 
          userData.enrolled_courses.includes(course.id) || 
          userData.purchased_courses.includes(course.id)
        );
        
        setCourses(filteredCourses);
        setIsLoading(false);
      })
      .catch(() => {
        setCourses([]);
        setIsLoading(false);
      });
  }, []);

  return { courses, isLoading };
}

// Non-hook version for server components
export async function getUserCourses(): Promise<Course[]> {
  try {
    const [studentData, coursesData] = await Promise.all([
      import('../data/student.json'),
      import('../data/courses.json')
    ]);
    
    const filteredCourses = (coursesData.default.courses as unknown as Course[]).filter((course: Course) => 
      studentData.default.enrolled_courses.includes(course.id) || 
      studentData.default.purchased_courses.includes(course.id)
    );
    return filteredCourses;
  } catch (error) {
    return mockCourses;
  }
}

// Non-hook version for server components
export async function getUserData(role: 'student'): Promise<StudentUser>;
export async function getUserData(role: 'creator'): Promise<CreatorUser>;
export async function getUserData(role: 'student' | 'creator'): Promise<StudentUser | CreatorUser> {
  try {
    if (role === 'creator') {
      const creatorData = await import('../data/creator.json');
      return creatorData.default as CreatorUser;
    }
    const studentData = await import('../data/student.json');
    return studentData.default as StudentUser;
  } catch (error) {
    return role === 'creator' ? mockCreatorData : mockStudentData;
  }
}

// Non-hook version of getCourseById
export async function getCourseById(id: string): Promise<Course | null> {
  try {
    const coursesData = await import('../data/courses.json');
    return (coursesData.default.courses as unknown as Course[]).find((course: Course) => course.id === id) || null;
  } catch (error) {
    return null;
  }
}

export async function canAccessCourse(courseId: string): Promise<boolean> {
  try {
    const studentData = await import('../data/student.json');
    return studentData.default.enrolled_courses.includes(courseId) || 
           studentData.default.purchased_courses.includes(courseId);
  } catch (error) {
    return false;
  }
}

export function useCompletedCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchData<'student'>('student'), fetchData<'courses'>('courses')])
      .then(([userData, coursesData]) => {
        const filteredCourses = (coursesData.courses as unknown as Course[]).filter((course: Course) => 
          userData.completed_courses.includes(course.id)
        );
        
        setCourses(filteredCourses);
        setIsLoading(false);
      })
      .catch(() => {
        setCourses([]);
        setIsLoading(false);
      });
  }, []);

  return { courses, isLoading };
}

export function useCreatorCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchData<'creator'>('creator'), fetchData<'courses'>('courses')])
      .then(([creator, coursesData]) => {
        const filteredCourses = (coursesData.courses as unknown as Course[]).filter((course: Course) => 
          course.instructor.id === creator.id
        );
        
        setCourses(filteredCourses);
        setIsLoading(false);
      })
      .catch(() => {
        setCourses([]);
        setIsLoading(false);
      });
  }, []);

  return { courses, isLoading };
}

export function useCreatorStats() {
  const [stats, setStats] = useState<CreatorUser['teaching_stats'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchData<'creator'>('creator')
      .then(creator => {
        setStats(creator.teaching_stats || null);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return { stats, isLoading, error };
}

export function useCreatorAnalytics() {
  const [analytics, setAnalytics] = useState<CreatorUser['creator_analytics'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchData<'creator'>('creator')
      .then(creator => {
        setAnalytics(creator.creator_analytics || null);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return { analytics, isLoading, error };
}

export function useStudentProgress() {
  const [progress, setProgress] = useState<StudentUser['learning_stats'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchData<'student'>('student')
      .then(student => {
        setProgress(student.learning_stats || null);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return { progress, isLoading, error };
}

export function useStudentPreferences() {
  const [preferences, setPreferences] = useState<StudentUser['preferences'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchData<'student'>('student')
      .then(student => {
        setPreferences(student.preferences || null);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return { preferences, isLoading, error };
}

// Community functions
export function useCommunity(id: string) {
  const [community, setCommunity] = useState<CommunityData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchData<'community'>('community')
      .then(data => {
        if (data && data.communities) {
          const foundCommunity = data.communities.find((community: CommunityData) => community.id === id);
          setCommunity(foundCommunity || null);
        } else {
          setCommunity(null);
        }
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, [id]);

  return { community, isLoading, error };
}

export function useCommunityMembers(communityId: string) {
  const { community, isLoading } = useCommunity(communityId);
  return { members: community?.members || [], isLoading };
}

export function useCommunityPosts(communityId: string) {
  const { community, isLoading } = useCommunity(communityId);
  return { posts: community?.posts || [], isLoading };
}

export function useCommunityEvents(communityId: string) {
  const { community, isLoading } = useCommunity(communityId);
  return { events: community?.events || [], isLoading };
}

export function useCommunityResources(communityId: string) {
  const { community, isLoading } = useCommunity(communityId);
  return { resources: community?.resources || [], isLoading };
}

export function useHelpData() {
  return fetchData('help');
}

// Helper functions that don't use hooks
export async function fetchUserData(role: 'student' | 'creator' = 'student'): Promise<StudentUser | CreatorUser> {
  try {
    if (role === 'creator') {
      const creatorData = await import('../data/creator.json');
      return creatorData.default as CreatorUser;
    }
    const studentData = await import('../data/student.json');
    return studentData.default as StudentUser;
  } catch (error) {
    return role === 'creator' ? mockCreatorData : mockStudentData;
  }
}

// Community helper functions
export function isUserMember(communityId: string, userId: string) {
  const { community } = useCommunity(communityId);
  return community?.members.some(member => member.userId === userId) || false;
}

export function isUserFollowing(communityId: string, userId: string) {
  const { community } = useCommunity(communityId);
  return community?.followers.some(follower => follower.userId === userId) || false;
}

export function getUserRole(communityId: string, userId: string) {
  const { community } = useCommunity(communityId);
  const member = community?.members.find(member => member.userId === userId);
  return member?.role || null;
}

// Action functions (these would typically make API calls in a real app)
export function updateCourseProgress(courseId: string, progress: number) {
  console.log('Updating course progress:', { courseId, progress });
  return { success: true };
}

export function updateCourse(courseId: string, data: any) {
  console.log('Updating course:', courseId, data);
  return { success: true };
}

export function updateCourseContent(courseId: string, content: any) {
  console.log('Updating course content:', courseId, content);
  return { success: true };
}

export function updateCourseMedia(courseId: string, media: { thumbnail?: string, preview_video?: string }) {
  console.log('Updating course media:', courseId, media);
  return { success: true };
}