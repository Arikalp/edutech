import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import CreateQuizPage from '../app/create-quiz/[roomCode]/page'

// Setup mock state variables prefixed with "mock" so Vitest allows them inside vi.mock
let mockAuthLoading = false;
let mockUser: any = { uid: 'teacher-123', displayName: 'Dr. Smith' };

const mockRouter = {
  push: vi.fn()
};

const mockParams = { roomCode: 'phy101' };

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useParams: () => mockParams,
  useRouter: () => mockRouter,
  usePathname: () => '/create-quiz/phy101'
}));

// Mock useAuth
vi.mock('../app/context/AuthContext', () => ({
  useAuth: () => ({
    user: mockUser,
    loading: mockAuthLoading
  })
}));

describe('CreateQuizPage', () => {
  beforeEach(() => {
    cleanup();
    localStorage.clear();
    mockAuthLoading = false;
    mockUser = { uid: 'teacher-123', displayName: 'Dr. Smith' };
    vi.clearAllMocks();
  });

  it('renders loading state when auth is loading', () => {
    mockAuthLoading = true;
    render(<CreateQuizPage />)
    expect(screen.getByText('Initializing Quiz Builder...')).toBeInTheDocument()
  })

  it('renders classroom details and quiz builder forms when classroom is found', async () => {
    const mockRoom = {
      id: 'room-123',
      name: 'Physics 101',
      description: 'Intro to physics',
      teacherId: 'teacher-123',
      teacherName: 'Dr. Smith',
      roomCode: 'phy101',
      students: []
    };
    localStorage.setItem('mindhub_demo_rooms', JSON.stringify({ phy101: mockRoom }));

    render(<CreateQuizPage />);
    
    // Check classroom details are displayed
    expect(await screen.findByText('Physics 101')).toBeInTheDocument();
    expect(screen.getByText('phy101')).toBeInTheDocument();
    
    // Check manual quiz mode inputs are displayed
    expect(screen.getByText('Create Yourself (Manual)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g. Physics Core Concepts Quiz')).toBeInTheDocument();
  });

  it('renders error message when classroom is not found', async () => {
    render(<CreateQuizPage />);
    expect(await screen.findByText('Classroom not found.')).toBeInTheDocument();
  });

  it('renders access denied message when user is not the classroom teacher', async () => {
    const mockRoom = {
      id: 'room-123',
      name: 'Physics 101',
      description: 'Intro to physics',
      teacherId: 'other-teacher',
      teacherName: 'Dr. Other',
      roomCode: 'phy101',
      students: []
    };
    localStorage.setItem('mindhub_demo_rooms', JSON.stringify({ phy101: mockRoom }));

    render(<CreateQuizPage />);
    expect(await screen.findByText('Access Denied: Only the class educator can create quizzes.')).toBeInTheDocument();
  });
});
