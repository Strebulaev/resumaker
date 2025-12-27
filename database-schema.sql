-- Rezulution AI Career Platform Database Schema
-- Supabase PostgreSQL Schema

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ===========================================
-- CORE TABLES
-- ===========================================

-- User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    phone TEXT,
    gender TEXT CHECK (gender IN ('male', 'female', 'unknown')) DEFAULT 'unknown',
    avatar_url TEXT,
    profile_data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Settings Table
CREATE TABLE IF NOT EXISTS user_settings (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    notifications JSONB DEFAULT '{
        "job_alerts": true,
        "profile_views": true,
        "messages": true,
        "learning_recommendations": true
    }',
    privacy JSONB DEFAULT '{
        "profile_visibility": "recruiters_only",
        "show_salary": false,
        "available_for_work": true
    }',
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- RESUME MANAGEMENT
-- ===========================================

-- Resumes Table
CREATE TABLE IF NOT EXISTS resumes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    content_markdown TEXT,
    is_active BOOLEAN DEFAULT false,
    visibility TEXT CHECK (visibility IN ('public', 'recruiters_only', 'private')) DEFAULT 'recruiters_only',
    version INTEGER DEFAULT 1,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resume Templates Table
CREATE TABLE IF NOT EXISTS resume_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT DEFAULT 'general',
    content_structure JSONB NOT NULL,
    preview_image_url TEXT,
    is_premium BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- JOB PLATFORM INTEGRATION
-- ===========================================

-- Job Platforms Table
CREATE TABLE IF NOT EXISTS job_platforms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    base_url TEXT NOT NULL,
    api_base_url TEXT,
    is_active BOOLEAN DEFAULT true,
    auth_type TEXT CHECK (auth_type IN ('oauth', 'api_key', 'none')) DEFAULT 'oauth',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Platform Tokens Table
CREATE TABLE IF NOT EXISTS user_platform_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    platform_id UUID NOT NULL REFERENCES job_platforms(id) ON DELETE CASCADE,
    access_token TEXT,
    refresh_token TEXT,
    token_expires_at TIMESTAMP WITH TIME ZONE,
    api_key TEXT,
    is_active BOOLEAN DEFAULT true,
    last_used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, platform_id)
);

-- Job Vacancies Table (cached from platforms)
CREATE TABLE IF NOT EXISTS job_vacancies (
    id TEXT PRIMARY KEY, -- External platform ID
    platform_id UUID NOT NULL REFERENCES job_platforms(id) ON DELETE CASCADE,
    external_id TEXT NOT NULL,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    description TEXT,
    requirements TEXT,
    salary_from DECIMAL(12,2),
    salary_to DECIMAL(12,2),
    salary_currency TEXT DEFAULT 'RUB',
    location TEXT,
    employment_type TEXT,
    experience_required TEXT,
    url TEXT,
    published_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(platform_id, external_id)
);

-- User Job Applications Table
CREATE TABLE IF NOT EXISTS user_job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    vacancy_id TEXT NOT NULL REFERENCES job_vacancies(id) ON DELETE CASCADE,
    resume_id UUID REFERENCES resumes(id) ON DELETE SET NULL,
    status TEXT CHECK (status IN ('applied', 'viewed', 'interview', 'offer', 'rejected', 'withdrawn')) DEFAULT 'applied',
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notes TEXT,
    platform_response JSONB DEFAULT '{}',
    UNIQUE(user_id, vacancy_id)
);

-- ===========================================
-- AI FEATURES
-- ===========================================

-- AI Usage Tracking Table
CREATE TABLE IF NOT EXISTS ai_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    feature_type TEXT NOT NULL CHECK (feature_type IN ('resume_generation', 'interview_prep', 'cover_letter', 'github_analysis')),
    tokens_used INTEGER DEFAULT 0,
    cost DECIMAL(8,4) DEFAULT 0,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User AI Limits Table
CREATE TABLE IF NOT EXISTS user_ai_limits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    feature_type TEXT NOT NULL,
    daily_limit INTEGER NOT NULL DEFAULT 10,
    monthly_limit INTEGER NOT NULL DEFAULT 300,
    used_today INTEGER DEFAULT 0,
    used_this_month INTEGER DEFAULT 0,
    reset_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, feature_type)
);

-- ===========================================
-- BILLING & SUBSCRIPTIONS
-- ===========================================

-- Subscription Plans Table
CREATE TABLE IF NOT EXISTS subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    display_name TEXT NOT NULL,
    description TEXT,
    price_monthly DECIMAL(8,2) NOT NULL,
    price_yearly DECIMAL(8,2),
    currency TEXT DEFAULT 'RUB',
    features JSONB NOT NULL DEFAULT '{}',
    limits JSONB NOT NULL DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Subscriptions Table
CREATE TABLE IF NOT EXISTS user_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES subscription_plans(id) ON DELETE RESTRICT,
    status TEXT CHECK (status IN ('active', 'canceled', 'expired', 'past_due')) DEFAULT 'active',
    billing_cycle TEXT CHECK (billing_cycle IN ('monthly', 'yearly')) DEFAULT 'monthly',
    current_period_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    current_period_end TIMESTAMP WITH TIME ZONE,
    cancel_at_period_end BOOLEAN DEFAULT false,
    payment_method_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payment Transactions Table
CREATE TABLE IF NOT EXISTS payment_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES user_subscriptions(id) ON DELETE SET NULL,
    amount DECIMAL(8,2) NOT NULL,
    currency TEXT DEFAULT 'RUB',
    status TEXT CHECK (status IN ('pending', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
    payment_method TEXT,
    external_transaction_id TEXT,
    description TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- ANALYTICS & TRACKING
-- ===========================================

-- User Analytics Table
CREATE TABLE IF NOT EXISTS user_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    event_data JSONB DEFAULT '{}',
    session_id TEXT,
    user_agent TEXT,
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Profile Views Table
CREATE TABLE IF NOT EXISTS profile_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    viewer_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    viewer_type TEXT CHECK (viewer_type IN ('recruiter', 'anonymous', 'platform')) DEFAULT 'anonymous',
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    source TEXT DEFAULT 'direct',
    metadata JSONB DEFAULT '{}'
);

-- ===========================================
-- NOTIFICATIONS
-- ===========================================

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('job_match', 'application_update', 'profile_view', 'system', 'marketing')),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    data JSONB DEFAULT '{}',
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- INDEXES FOR PERFORMANCE
-- ===========================================

-- Core indexes
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_updated_at ON user_profiles(updated_at);

CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_resumes_is_active ON resumes(is_active);

CREATE INDEX IF NOT EXISTS idx_job_vacancies_platform_active ON job_vacancies(platform_id, is_active);
CREATE INDEX IF NOT EXISTS idx_job_vacancies_published_at ON job_vacancies(published_at);

CREATE INDEX IF NOT EXISTS idx_user_job_applications_user_status ON user_job_applications(user_id, status);
CREATE INDEX IF NOT EXISTS idx_user_job_applications_vacancy ON user_job_applications(vacancy_id);

CREATE INDEX IF NOT EXISTS idx_ai_usage_user_feature ON ai_usage(user_id, feature_type);
CREATE INDEX IF NOT EXISTS idx_ai_usage_created_at ON ai_usage(created_at);

CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_status ON user_subscriptions(user_id, status);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_plan ON user_subscriptions(plan_id);

CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications(user_id, is_read) WHERE is_read = false;
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

-- ===========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ===========================================

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_platform_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_vacancies ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_ai_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- User Profiles: Users can only access their own profiles
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- User Settings: Users can only access their own settings
CREATE POLICY "Users can manage own settings" ON user_settings
    FOR ALL USING (auth.uid() = id);

-- Resumes: Users can only access their own resumes
CREATE POLICY "Users can manage own resumes" ON resumes
    FOR ALL USING (auth.uid() = user_id);

-- Resume Templates: Public read access, admin write access
CREATE POLICY "Anyone can view active templates" ON resume_templates
    FOR SELECT USING (is_active = true);

-- Job Platforms: Public read access
CREATE POLICY "Anyone can view active platforms" ON job_platforms
    FOR SELECT USING (is_active = true);

-- User Platform Tokens: Users can only access their own tokens
CREATE POLICY "Users can manage own platform tokens" ON user_platform_tokens
    FOR ALL USING (auth.uid() = user_id);

-- Job Vacancies: Public read access for active vacancies
CREATE POLICY "Anyone can view active vacancies" ON job_vacancies
    FOR SELECT USING (is_active = true);

-- User Job Applications: Users can only access their own applications
CREATE POLICY "Users can manage own applications" ON user_job_applications
    FOR ALL USING (auth.uid() = user_id);

-- AI Usage: Users can only view their own usage
CREATE POLICY "Users can view own AI usage" ON ai_usage
    FOR SELECT USING (auth.uid() = user_id);

-- AI Limits: Users can only access their own limits
CREATE POLICY "Users can view own AI limits" ON user_ai_limits
    FOR ALL USING (auth.uid() = user_id);

-- Subscription Plans: Public read access
CREATE POLICY "Anyone can view active plans" ON subscription_plans
    FOR SELECT USING (is_active = true);

-- User Subscriptions: Users can only access their own subscriptions
CREATE POLICY "Users can view own subscriptions" ON user_subscriptions
    FOR SELECT USING (auth.uid() = user_id);

-- Payment Transactions: Users can only access their own transactions
CREATE POLICY "Users can view own payments" ON payment_transactions
    FOR SELECT USING (auth.uid() = user_id);

-- User Analytics: Users can only access their own analytics
CREATE POLICY "Users can view own analytics" ON user_analytics
    FOR SELECT USING (auth.uid() = user_id);

-- Profile Views: Profile owners can view who viewed their profile
CREATE POLICY "Users can view profile views" ON profile_views
    FOR SELECT USING (auth.uid() = profile_user_id);

-- Notifications: Users can only access their own notifications
CREATE POLICY "Users can manage own notifications" ON notifications
    FOR ALL USING (auth.uid() = user_id);

-- ===========================================
-- FUNCTIONS & TRIGGERS
-- ===========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to relevant tables
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_resumes_updated_at BEFORE UPDATE ON resumes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_resume_templates_updated_at BEFORE UPDATE ON resume_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_platform_tokens_updated_at BEFORE UPDATE ON user_platform_tokens FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_job_vacancies_updated_at BEFORE UPDATE ON job_vacancies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_subscriptions_updated_at BEFORE UPDATE ON user_subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_ai_limits_updated_at BEFORE UPDATE ON user_ai_limits FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');

    INSERT INTO public.user_settings (id)
    VALUES (NEW.id);

    INSERT INTO public.user_ai_limits (user_id, feature_type, daily_limit, monthly_limit)
    VALUES
        (NEW.id, 'resume_generation', 5, 50),
        (NEW.id, 'interview_prep', 3, 30),
        (NEW.id, 'cover_letter', 5, 50),
        (NEW.id, 'github_analysis', 2, 20);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ===========================================
-- INITIAL DATA
-- ===========================================

-- Insert default subscription plans
INSERT INTO subscription_plans (name, display_name, description, price_monthly, price_yearly, features, limits) VALUES
('free', 'Бесплатный', 'Базовые функции для создания резюме', 0, 0, '{
    "resume_generation": true,
    "basic_templates": true,
    "job_search": true,
    "profile_views": 10
}', '{
    "resume_generation": 5,
    "interview_prep": 3,
    "cover_letter": 5,
    "github_analysis": 2
}'),
('pro', 'Профессиональный', 'Расширенные возможности для карьерного роста', 990, 9900, '{
    "resume_generation": true,
    "premium_templates": true,
    "advanced_ai": true,
    "job_matching": true,
    "interview_prep": true,
    "priority_support": true,
    "profile_views": 100
}', '{
    "resume_generation": 50,
    "interview_prep": 30,
    "cover_letter": 50,
    "github_analysis": 20
}'),
('enterprise', 'Корпоративный', 'Полный набор инструментов для команд', 2990, 29900, '{
    "all_pro_features": true,
    "team_management": true,
    "analytics": true,
    "api_access": true,
    "custom_branding": true,
    "unlimited_usage": true
}', '{
    "unlimited": true
}') ON CONFLICT (name) DO NOTHING;

-- Insert job platforms
INSERT INTO job_platforms (name, display_name, base_url, api_base_url, auth_type) VALUES
('hh', 'HeadHunter', 'https://hh.ru', 'https://api.hh.ru', 'oauth'),
('superjob', 'SuperJob', 'https://superjob.ru', 'https://api.superjob.ru', 'oauth'),
('habr', 'Habr Career', 'https://career.habr.com', 'https://career.habr.com/api', 'oauth')
ON CONFLICT (name) DO NOTHING;

-- Insert resume templates
INSERT INTO resume_templates (name, description, category, content_structure, is_premium) VALUES
('modern', 'Современный шаблон с акцентом на достижения', 'general', '{
    "sections": ["contact", "summary", "experience", "education", "skills"],
    "style": "modern"
}', false),
('technical', 'Технический шаблон для IT-специалистов', 'it', '{
    "sections": ["contact", "summary", "experience", "projects", "skills", "education"],
    "style": "technical"
}', false),
('creative', 'Креативный шаблон для дизайнеров и маркетологов', 'creative', '{
    "sections": ["contact", "portfolio", "experience", "skills", "education"],
    "style": "creative"
}', true),
('executive', 'Шаблон для руководителей и топ-менеджеров', 'executive', '{
    "sections": ["contact", "executive_summary", "experience", "achievements", "education"],
    "style": "executive"
}', true)
ON CONFLICT (name) DO NOTHING;