import { render, screen, fireEvent } from '@testing-library/react';
import TaskCard from '@/components/TaskCard';
import { Task } from '@/types';

const mockTask: Task = {
  id: '1',
  title: 'Test Task',
  description: 'This is a test',
  status: 'todo',
  category: 'Work',
  createdAt: new Date().toISOString(),
};

describe('TaskCard', () => {
  it('renders task title correctly', () => {
    render(<TaskCard task={mockTask} onEdit={jest.fn()} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const onEdit = jest.fn();
    render(<TaskCard task={mockTask} onEdit={onEdit} />);
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    
    expect(onEdit).toHaveBeenCalledWith(mockTask);
  });
});