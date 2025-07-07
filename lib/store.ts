import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CourseProgress {
  courseId: string;
  moduleId: string;
  lessonId: string;
  completed: boolean;
  lastAccessed: string;
  selectedTrack: 'blended' | 'video' | 'text';
}

interface ProgressStore {
  progress: Record<string, CourseProgress>;
  selectedTracks: Record<string, 'blended' | 'video' | 'text'>;
  updateProgress: (courseId: string, moduleId: string, lessonId: string) => void;
  markModuleComplete: (courseId: string, moduleId: string) => void;
  getProgress: (courseId: string) => number;
  setLearningTrack: (courseId: string, track: 'blended' | 'video' | 'text') => void;
  getLearningTrack: (courseId: string) => 'blended' | 'video' | 'text';
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      progress: {},
      selectedTracks: {},
      updateProgress: (courseId, moduleId, lessonId) => {
        set((state) => ({
          progress: {
            ...state.progress,
            [`${courseId}-${moduleId}-${lessonId}`]: {
              courseId,
              moduleId,
              lessonId,
              completed: true,
              lastAccessed: new Date().toISOString(),
              selectedTrack: state.selectedTracks[courseId] || 'blended',
            },
          },
        }));
      },
      markModuleComplete: (courseId, moduleId) => {
        set((state) => ({
          progress: {
            ...state.progress,
            [`${courseId}-${moduleId}`]: {
              courseId,
              moduleId,
              lessonId: '',
              completed: true,
              lastAccessed: new Date().toISOString(),
              selectedTrack: state.selectedTracks[courseId] || 'blended',
            },
          },
        }));
      },
      getProgress: (courseId) => {
        const progress = get().progress;
        const courseProgress = Object.values(progress).filter(
          (p) => p.courseId === courseId
        );
        if (courseProgress.length === 0) return 0;
        const completed = courseProgress.filter((p) => p.completed).length;
        return Math.round((completed / courseProgress.length) * 100);
      },
      setLearningTrack: (courseId, track) => {
        set((state) => ({
          selectedTracks: {
            ...state.selectedTracks,
            [courseId]: track,
          },
        }));
      },
      getLearningTrack: (courseId) => {
        const state = get();
        return state.selectedTracks[courseId] || 'blended';
      },
    }),
    {
      name: 'course-progress',
    }
  )
);