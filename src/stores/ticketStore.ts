
import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'pending' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  department: string;
  created_by: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  ticket_id: string;
  user_id: string;
  content: string;
  is_internal: boolean;
  created_at: string;
}

interface TicketState {
  tickets: Ticket[];
  selectedTicket: Ticket | null;
  loading: boolean;
  fetchTickets: () => Promise<void>;
  createTicket: (ticket: Omit<Ticket, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateTicket: (id: string, updates: Partial<Ticket>) => Promise<void>;
  setSelectedTicket: (ticket: Ticket | null) => void;
  getTicketsByUser: (userId: string) => Ticket[];
  getUnassignedTickets: () => Ticket[];
}

export const useTicketStore = create<TicketState>((set, get) => ({
  tickets: [],
  selectedTicket: null,
  loading: false,

  fetchTickets: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching tickets:', error);
        throw error;
      }

      console.log('Fetched tickets:', data);
      set({ tickets: data || [], loading: false });
    } catch (error) {
      console.error('Error fetching tickets:', error);
      set({ loading: false });
    }
  },

  createTicket: async (ticketData) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('tickets')
        .insert([ticketData])
        .select()
        .single();

      if (error) {
        console.error('Error creating ticket:', error);
        throw error;
      }

      console.log('Created ticket:', data);
      // Refresh the tickets list
      await get().fetchTickets();
      set({ loading: false });
    } catch (error) {
      console.error('Error creating ticket:', error);
      set({ loading: false });
      throw error;
    }
  },

  updateTicket: async (id, updates) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('tickets')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating ticket:', error);
        throw error;
      }

      console.log('Updated ticket:', data);
      // Refresh the tickets list
      await get().fetchTickets();
      set({ loading: false });
    } catch (error) {
      console.error('Error updating ticket:', error);
      set({ loading: false });
      throw error;
    }
  },

  setSelectedTicket: (ticket) => set({ selectedTicket: ticket }),

  getTicketsByUser: (userId) => get().tickets.filter(ticket => ticket.created_by === userId),

  getUnassignedTickets: () => get().tickets.filter(ticket => !ticket.assigned_to),
}));
