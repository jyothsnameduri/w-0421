
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User, MessageSquare, Settings } from 'lucide-react';

interface TimelineEvent {
  id: string;
  type: 'created' | 'status_change' | 'comment' | 'assigned';
  title: string;
  description: string;
  timestamp: Date;
  user: string;
}

interface TicketTimelineProps {
  ticketId?: string;
}

const TicketTimeline: React.FC<TicketTimelineProps> = ({ ticketId }) => {
  // Mock timeline data - replace with actual data fetching
  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      type: 'created',
      title: 'Ticket Created',
      description: 'Support ticket was created and submitted',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      user: 'You',
    },
    {
      id: '2',
      type: 'status_change',
      title: 'Status Changed',
      description: 'Ticket status changed from "Open" to "In Progress"',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      user: 'Support Agent',
    },
    {
      id: '3',
      type: 'comment',
      title: 'Comment Added',
      description: 'Agent requested additional information about the issue',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      user: 'Support Agent',
    },
    {
      id: '4',
      type: 'assigned',
      title: 'Ticket Assigned',
      description: 'Ticket was assigned to IT Specialist John Doe',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      user: 'System',
    },
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'created':
        return <Clock className="h-4 w-4" />;
      case 'status_change':
        return <Settings className="h-4 w-4" />;
      case 'comment':
        return <MessageSquare className="h-4 w-4" />;
      case 'assigned':
        return <User className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'created':
        return 'bg-blue-500';
      case 'status_change':
        return 'bg-yellow-500';
      case 'comment':
        return 'bg-green-500';
      case 'assigned':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Ticket Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {timelineEvents.map((event, index) => (
            <div key={event.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full ${getEventColor(event.type)} flex items-center justify-center text-white`}>
                  {getEventIcon(event.type)}
                </div>
                {index < timelineEvents.length - 1 && (
                  <div className="w-0.5 h-8 bg-border mt-2"></div>
                )}
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{event.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {event.user}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {event.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {event.timestamp.toLocaleDateString()} at{' '}
                  {event.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {timelineEvents.length === 0 && (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No timeline events yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TicketTimeline;
