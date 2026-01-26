-- Add source column to orders table for tracking submission source
-- Run this SQL in your Supabase SQL editor

-- Add source column to orders table
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'HeroLiveTV';

-- Add source column to contact_submissions table
ALTER TABLE public.contact_submissions 
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'HeroLiveTV';

-- Create index on source for faster filtering
CREATE INDEX IF NOT EXISTS orders_source_idx ON public.orders(source);
CREATE INDEX IF NOT EXISTS contact_submissions_source_idx ON public.contact_submissions(source);

-- Update existing records to have HeroLiveTV as source (if any exist)
UPDATE public.orders SET source = 'HeroLiveTV' WHERE source IS NULL;
UPDATE public.contact_submissions SET source = 'HeroLiveTV' WHERE source IS NULL;
