import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, ChevronUp, Heart,  MessageSquare,   User } from 'lucide-react'
import { Clock } from 'lucide-react'
import { useMemo } from 'react'

// Helper to format date as day (number) and month (Hebrew), omitting year and hour
function formatHebrewDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const months = [
    'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
    'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
  ];
  const month = months[date.getMonth()];
  return `${day} ${month}`;
}

interface FeatureRequest {
  id: string
  title: string
  description: string
  fullDescription?: string
  upvotes: number
  comments: number
  date: string
  creator: string
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
}

interface FeatureRequestCardProps {
  request: FeatureRequest
  defaultExpanded?: boolean
}

export function FeatureRequestCard({
  request,
  defaultExpanded = false
}: FeatureRequestCardProps) {
  // Helper to get relative date in Hebrew
  const getRelativeDate = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    if (diffDays === 0) return 'היום'
    if (diffDays === 1) return 'אתמול'
    return `לפני ${diffDays} ימים`
  }

  const relativeDate = useMemo(() => getRelativeDate(request.date), [request.date])
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const [upvotes, setUpvotes] = useState(request.upvotes)
  const [showChat, setShowChat] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800'
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return '✓ הושלם'
      case 'IN_PROGRESS':
        return 'בטיפול'
      default:
        return 'ממתין'
    }
  }

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation()
    setUpvotes(upvotes + 1)
  }

  return (
    <Card
      className="feature-request-card group relative"
      style={{
        maxHeight: isExpanded ? undefined : '110px',
        overflow: isExpanded ? undefined : 'hidden',
        transition: 'max-height 0.2s',
        background: '#FFFFFF',
      }}
    >
      {/* פס סגול בצד ימין ב-hover */}
      <div className="absolute right-0 top-0 h-full w-1 bg-indigo-500 rounded-r-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ zIndex: 2 }} />
      <div
        className="w-full flex flex-row justify-end items-center gap-4 transition-colors text-right relative"
        style={{
          border: 'none',
          boxShadow: 'none',
          padding: '16px 20px',
          height: '95px',
          cursor: 'pointer',
          background: isExpanded ? '#EDE9FE' : '#FFFFFF',
        }}
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
      >
        {/* Upvote Button on the right */}
        <div
          className={`rounded-lg p-2 flex flex-col items-center justify-center gap-1 min-w-fit transition-all
            ${isExpanded ? 'text-white shadow-md' : 'bg-[#F4F3FF] text-gray-700'}`}
          style={{
            minWidth: '48px',
            height: '61px',
            marginBottom:'9px',
            fontWeight: 700,
            fontSize: '22px',
            lineHeight: '33px',
            letterSpacing: '-0.66px',
            boxShadow: isExpanded ? undefined : 'none',
            background: isExpanded
              ? 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)'
              : undefined,
          }}
        >
          <ChevronUp className={`w-4 h-4 ${isExpanded ? 'text-white' : 'text-gray-400'}`} />
          <span className={`text-xs font-bold ${isExpanded ? 'text-white' : 'text-gray-900'}`}>{upvotes}</span>
        </div>

        {/* Title, Description, Comments and Date */}
        <div className="flex flex-col text-right flex-1 min-w-0 h-18">
          <h3 className="font-bold text-gray-900 mb-1 text-base" style={{ marginBottom: '0px', marginTop: '0px' }}>
            {request.title}
          </h3>
          <p className={`text-sm text-gray-600 line-clamp-1`} style={{ marginBottom: '0px', marginTop: '0px' }}>
            {request.description}
          </p>
          <div className="flex flex-row-reverse gap-4 mt-2 justify-end text-right">
            <span
              className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer hover:text-indigo-500"
              onClick={() => setShowChat(true)}
            >
              <MessageSquare className="w-3 h-3 text-gray-400" />
              {request.comments} תגובות
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3 text-gray-400" />
              {formatHebrewDate(request.date)}
            </span>
          </div>
        </div>
        {/* Status Badge */}
        <Badge className={getStatusColor(request.status)} style={{ fontWeight: 600, fontSize: '14px', padding: '6px 16px', borderRadius: '8px' }}>
          {getStatusLabel(request.status)}
        </Badge>
      </div>
      {/* Chat Modal */}
      {showChat && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 12, width: 400, maxWidth: '90vw', boxShadow: '0 4px 32px rgba(0,0,0,0.12)', padding: 0, display: 'flex', flexDirection: 'column', minHeight: 420, maxHeight: '80vh', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', borderBottom: '1px solid #F3F4F6', background: '#F9FAFB' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px 4px 20px' }}>
                <span style={{ fontWeight: 700, fontSize: 16, color: '#3730A3', fontFamily: 'Plus Jakarta Sans, Rubik, Heebo, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>צ'אט תגובות</span>
                <button onClick={() => setShowChat(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 6L14 14M14 6L6 14" stroke="#A3A3A3" strokeWidth="1.67" strokeLinecap="round"/></svg>
                </button>
              </div>
              <div style={{ padding: '0 20px 12px 20px', fontWeight: 600, fontSize: 14, color: '#6366F1', fontFamily: 'Plus Jakarta Sans, Rubik, Heebo, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {request.title}
              </div>
            </div>
            {/* Chat Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', background: '#F6F6FB' }}>
              {/* Example message */}
              <div style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <div style={{ background: '#E0E7FF', color: '#3730A3', borderRadius: 8, padding: '8px 12px', fontSize: 14, fontFamily: 'Plus Jakarta Sans, Rubik, Heebo, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', maxWidth: 260, wordBreak: 'break-word' }}>
                  דוגמה להודעה בצ'אט
                </div>
                <span style={{ fontSize: 10, color: '#A3A3A3', marginTop: 2, alignSelf: 'flex-end' }}>16.2.2026 14:32</span>
              </div>
              {/* ... כאן יופיעו הודעות נוספות ... */}
            </div>
            {/* Input */}
            <form style={{ display: 'flex', alignItems: 'center', borderTop: '1px solid #F3F4F6', background: '#fff', padding: '12px 16px', gap: 8 }}>
              <input
                type="text"
                placeholder="כתוב תגובה..."
                style={{ flex: 1, border: '1px solid #E5E7EB', borderRadius: 8, padding: '8px 12px', fontSize: 14, fontFamily: 'Plus Jakarta Sans, Rubik, Heebo, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', outline: 'none', background: '#F9FAFB' }}
              />
              <button type="submit" style={{ background: 'linear-gradient(107.63deg, #6366F1 0%, #8B5CF6 100%)', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 600, fontSize: 14, padding: '8px 16px', cursor: 'pointer' }}>
                שלח
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Expanded Section */}
      {isExpanded && (
        <div className="px-0 pt-0 pb-6 border-t-0 bg-transparent space-y-6 animate-in">
          {/* Full Description */}
          <div className="px-6 pt-6 space-y-3">
            <p className="text-lg text-gray-900 whitespace-pre-wrap text-right leading-relaxed mb-6" style={{ marginBottom: '0px', marginTop: '0px' }}>
              {request.fullDescription || request.description}
            </p>
          </div>

          {/* Upvote/Details Bar - Figma spec */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '16px 25px 16px 10px',
              gap: '16px',
              width: '158%',
              background: '#edeef1',
              borderRadius: '10px',
              boxSizing: 'border-box',
              marginRight: '2.2%',
            }}
            className="detail-upvote"
          >
            <Button
              onClick={handleUpvote}
              className="bg-green-600 hover:bg-green-700 text-white gap-2"
              style={{ fontWeight: 600, fontSize: '16px', padding: '12px 32px', borderRadius: '8px', minWidth: 120 }}
            >
              הצבעת!
            </Button>
            <span style={{ fontWeight: 800, fontSize: 28, color: '#111', marginRight: 12 }}>{upvotes}</span>
            <span style={{ color: '#737373', fontSize: 14 }}>משתמשים תומכים בבקשה זו</span>
          </div>

          {/* Metadata Cards */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            style={{
              paddingLeft: 30,
              paddingRight: 15,
              width: '164.75%',
              boxSizing: 'border-box',

            }}
          >
            <Card className="p-2 text-center" style={{ borderRadius: '8px', fontWeight: 600, height: 65, minWidth: 180, paddingLeft: 24, paddingRight: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#edeef1', }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                {/* Icon בתוך ריבוע */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  backgroundColor: '#ffffff',
                  flexShrink: 0
                }}>
                  <User className="w-5 h-5 text-gray-400" />
                </div>

                {/* Texts צמודים לשמאל */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-0" style={{ marginTop: '0px', marginBottom: '0px', lineHeight: '16px' }}>
                    נוצר ע"י
                  </p>
                  <p className="text-base font-bold text-gray-700" style={{ marginTop: '0px', lineHeight: '18px' }}>
                    {request.creator}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-2 text-center" style={{ borderRadius: '8px', fontWeight: 600, height: 65, minWidth: 10, paddingLeft: 24, paddingRight: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#edeef1', }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                {/* Icon בתוך ריבוע */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  backgroundColor: '#ffffff',
                  flexShrink: 0
                }}>
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>

                {/* Texts צמודים לשמאל */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-0" style={{ marginTop: '0px', marginBottom: '0px', lineHeight: '16px' }}>
                    תאריך
                  </p>
                  <p className="text-base font-bold text-gray-700" style={{ marginTop: '0px', lineHeight: '18px' }}>
                    {formatHebrewDate(request.date)}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-2 text-center" style={{ borderRadius: '8px', fontWeight: 600, height: 65, minWidth: 180, paddingLeft: 24, paddingRight: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#edeef1', }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                {/* Icon בתוך ריבוע */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  backgroundColor: '#ffffff',
                  flexShrink: 0
                }}>
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                </div>

                {/* Texts צמודים לשמאל */}
                <div
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0, cursor: 'pointer' }}
                  onClick={() => setShowChat(true)}
                  title="הצג צ'אט"
                >
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-0" style={{ marginTop: '0px', marginBottom: '0px', lineHeight: '16px' }}>
                    תגובות
                  </p>
                  <p className="text-base font-bold text-gray-700" style={{ marginTop: '0px', lineHeight: '18px' }}>
                    {request.comments}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </Card>
  )
}