
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useNotifications, Notification } from '@/context/NotificationContext';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const NotificationItem: React.FC<{ notification: Notification, onRead: () => void }> = ({ 
  notification, 
  onRead 
}) => {
  const { title, message, type, read, date } = notification;
  
  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'text-green-500';
      case 'warning': return 'text-amber-500';
      case 'error': return 'text-destructive';
      default: return 'text-primary';
    }
  };
  
  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return '✓';
      case 'warning': return '⚠️';
      case 'error': return '✗';
      default: return 'ℹ️';
    }
  };
  
  return (
    <DropdownMenuItem 
      className={cn(
        "flex flex-col items-start p-3 gap-1 cursor-pointer transition-colors", 
        !read ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted",
      )}
      onClick={onRead}
    >
      <div className="flex items-center w-full">
        <span className={cn("mr-2 text-lg", getTypeColor(type))}>
          {getTypeIcon(type)}
        </span>
        <span className="font-medium flex-1">{title}</span>
        {!read && <Badge variant="outline" className="bg-primary text-primary-foreground ml-2 animate-pulse">New</Badge>}
      </div>
      <p className="text-sm text-muted-foreground">{message}</p>
      <p className="text-xs text-muted-foreground mt-1">
        {format(new Date(date), 'MMM dd, h:mm a')}
      </p>
    </DropdownMenuItem>
  );
};

const NotificationIcon: React.FC = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotifications();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="default" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 animate-pulse"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[350px] max-h-[500px] overflow-auto">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          <div className="flex gap-1">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs h-7 px-2">
                Mark all as read
              </Button>
            )}
            {notifications.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearNotifications} className="text-xs h-7 px-2">
                Clear all
              </Button>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <p>No notifications</p>
            </div>
          ) : (
            notifications.map(notification => (
              <React.Fragment key={notification.id}>
                <NotificationItem 
                  notification={notification}
                  onRead={() => markAsRead(notification.id)}
                />
                <DropdownMenuSeparator />
              </React.Fragment>
            ))
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationIcon;
