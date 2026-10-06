// Mirrors supabase/migrations. Regenerate with:
// npx supabase gen types typescript --project-id <id> > app/types/database.types.ts

export interface Database {
  public: {
    Tables: {
      contact_requests: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          phone: string
          company: string
          role: string
          need: string
          locale: 'es' | 'en'
          source: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          phone: string
          company?: string
          role?: string
          need?: string
          locale?: 'es' | 'en'
          source?: string
        }
        Update: Partial<Database['public']['Tables']['contact_requests']['Insert']>
        Relationships: []
      }
    }
    Views: Record<never, never>
    Functions: Record<never, never>
    Enums: Record<never, never>
    CompositeTypes: Record<never, never>
  }
}
