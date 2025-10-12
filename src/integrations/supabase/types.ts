export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          activity_date: string | null
          activity_type: string | null
          created_at: string
          description: string | null
          id: string
          institution_id: string | null
          status: string | null
          title: string
        }
        Insert: {
          activity_date?: string | null
          activity_type?: string | null
          created_at?: string
          description?: string | null
          id?: string
          institution_id?: string | null
          status?: string | null
          title: string
        }
        Update: {
          activity_date?: string | null
          activity_type?: string | null
          created_at?: string
          description?: string | null
          id?: string
          institution_id?: string | null
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "activities_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institutions: {
        Row: {
          aishe_code: string
          created_at: string
          established_year: number | null
          id: string
          location: string | null
          name: string
          state: string | null
          total_faculty: number | null
          total_students: number | null
          type: string | null
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          aishe_code: string
          created_at?: string
          established_year?: number | null
          id?: string
          location?: string | null
          name: string
          state?: string | null
          total_faculty?: number | null
          total_students?: number | null
          type?: string | null
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          aishe_code?: string
          created_at?: string
          established_year?: number | null
          id?: string
          location?: string | null
          name?: string
          state?: string | null
          total_faculty?: number | null
          total_students?: number | null
          type?: string | null
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      nirf_rankings: {
        Row: {
          created_at: string
          go_score: number | null
          id: string
          institution_id: string
          oi_score: number | null
          overall_rank: number | null
          perception_score: number | null
          rpc_score: number | null
          tlr_score: number | null
          year: number
        }
        Insert: {
          created_at?: string
          go_score?: number | null
          id?: string
          institution_id: string
          oi_score?: number | null
          overall_rank?: number | null
          perception_score?: number | null
          rpc_score?: number | null
          tlr_score?: number | null
          year: number
        }
        Update: {
          created_at?: string
          go_score?: number | null
          id?: string
          institution_id?: string
          oi_score?: number | null
          overall_rank?: number | null
          perception_score?: number | null
          rpc_score?: number | null
          tlr_score?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "nirf_rankings_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      scheme_beneficiaries: {
        Row: {
          amount_disbursed: number | null
          application_date: string | null
          approval_status: string | null
          approved_date: string | null
          created_at: string
          id: string
          institution_id: string | null
          scheme_id: string
          student_id: string | null
        }
        Insert: {
          amount_disbursed?: number | null
          application_date?: string | null
          approval_status?: string | null
          approved_date?: string | null
          created_at?: string
          id?: string
          institution_id?: string | null
          scheme_id: string
          student_id?: string | null
        }
        Update: {
          amount_disbursed?: number | null
          application_date?: string | null
          approval_status?: string | null
          approved_date?: string | null
          created_at?: string
          id?: string
          institution_id?: string | null
          scheme_id?: string
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scheme_beneficiaries_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheme_beneficiaries_scheme_id_fkey"
            columns: ["scheme_id"]
            isOneToOne: false
            referencedRelation: "schemes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheme_beneficiaries_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      schemes: {
        Row: {
          benefits: string | null
          created_at: string
          description: string | null
          eligibility_criteria: Json | null
          end_date: string | null
          id: string
          is_active: boolean | null
          ministry: string | null
          name: string
          start_date: string | null
          updated_at: string
        }
        Insert: {
          benefits?: string | null
          created_at?: string
          description?: string | null
          eligibility_criteria?: Json | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          ministry?: string | null
          name: string
          start_date?: string | null
          updated_at?: string
        }
        Update: {
          benefits?: string | null
          created_at?: string
          description?: string | null
          eligibility_criteria?: Json | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          ministry?: string | null
          name?: string
          start_date?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          aadhar_id: string
          category: string | null
          cgpa: number | null
          course: string | null
          created_at: string
          date_of_birth: string | null
          enrollment_number: string | null
          gender: string | null
          id: string
          institution_id: string | null
          updated_at: string
          user_id: string
          year_of_study: number | null
        }
        Insert: {
          aadhar_id: string
          category?: string | null
          cgpa?: number | null
          course?: string | null
          created_at?: string
          date_of_birth?: string | null
          enrollment_number?: string | null
          gender?: string | null
          id?: string
          institution_id?: string | null
          updated_at?: string
          user_id: string
          year_of_study?: number | null
        }
        Update: {
          aadhar_id?: string
          category?: string | null
          cgpa?: number | null
          course?: string | null
          created_at?: string
          date_of_birth?: string | null
          enrollment_number?: string | null
          gender?: string | null
          id?: string
          institution_id?: string | null
          updated_at?: string
          user_id?: string
          year_of_study?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "students_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      teachers: {
        Row: {
          apar_id: string
          created_at: string
          department: string | null
          designation: string | null
          id: string
          institution_id: string | null
          research_papers: number | null
          specialization: string | null
          updated_at: string
          user_id: string
          years_of_experience: number | null
        }
        Insert: {
          apar_id: string
          created_at?: string
          department?: string | null
          designation?: string | null
          id?: string
          institution_id?: string | null
          research_papers?: number | null
          specialization?: string | null
          updated_at?: string
          user_id: string
          years_of_experience?: number | null
        }
        Update: {
          apar_id?: string
          created_at?: string
          department?: string | null
          designation?: string | null
          id?: string
          institution_id?: string | null
          research_papers?: number | null
          specialization?: string | null
          updated_at?: string
          user_id?: string
          years_of_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "teachers_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "institution" | "student" | "teacher" | "government"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["institution", "student", "teacher", "government"],
    },
  },
} as const
