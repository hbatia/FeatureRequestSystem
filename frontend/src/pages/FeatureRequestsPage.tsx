import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Header } from '@/components/Header';
import { StatsCards } from '@/components/StatsCards';
import { FeatureRequestCard } from '@/components/FeatureRequestCard';
import { useFeatureRequests, useCompletedLastMonth } from '@/hooks/useFeatureRequests';

export function FeatureRequestsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: requests, isLoading, error } = useFeatureRequests();
  const { data: completedLastMonth } = useCompletedLastMonth();

  const filteredRequests = useMemo(() => {
    if (!requests) return [];
    if (!searchQuery.trim()) return requests;
    
    const query = searchQuery.toLowerCase();
    return requests.filter(
      (r) =>
        r.title.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query)
    );
  }, [requests, searchQuery]);

  const stats = useMemo(() => {
    if (!requests) return { total: 0, pending: 0, completedThisMonth: 0 };
    
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const completedThisMonth = requests.filter((r) => {
      if (r.status !== 'COMPLETED' || !r.completedAt) return false;
      const completedDate = new Date(r.completedAt);
      return completedDate.getMonth() === currentMonth && completedDate.getFullYear() === currentYear;
    }).length;

    return {
      total: requests.length,
      pending: requests.filter((r) => r.status === 'PENDING').length,
      completedThisMonth,
    };
  }, [requests]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500 text-[14px]">שגיאה בטעינת הבקשות</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center isolate bg-gradient-main font-jakarta">
      <Header />
      {/* Main Content */}
      <main className="main-content mx-auto px-0 py-0">
        {/* Page Header */}
        <div className="flex items-center justify-between h-[54px] mb-6 pt-[33px]">
          <div className="flex flex-col items-start gap-[1px]">
            <h1 className="flex items-center text-right text-[22px] font-semibold text-[#171717] tracking-[-0.66px] leading-[33px] whitespace-nowrap ">
              בקשות פיצ'רים
            </h1>
            <p className="text-[13px] font-normal text-[#737373] leading-5">
              נהל והצבע על בקשות לפיצ'רים חדשים
            </p>
          </div>
          
          <button
            className="flex items-center justify-center gap-[6px] w-[129px] h-[34px] px-4 py-[7px] text-white rounded-lg"
            style={{ background: 'linear-gradient(105.97deg,#6366F1 0%,#8B5CF6 100%)', boxShadow: '0px 1px 3px rgba(99,102,241,0.3)' }}
          >
            <span className="text-[13px] font-semibold leading-5">בקשה חדשה</span>
            <Plus className="w-4 h-4" strokeWidth={1.33} />
          </button>
        </div>
        {/* Stats Cards - מחוץ ל-requests-list */}
        <div className="flex justify-center w-full mb-4">
          <StatsCards
            totalRequests={stats.total}
            pendingRequests={stats.pending}
            completedThisMonth={stats.completedThisMonth}
            previousMonthCompleted={completedLastMonth?.length}
          />
        </div>

        {/* Search Bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 0,
            rowGap: 0,
            width: '100%',
            margin: '0 auto 16px auto',
            position: 'static',
          }}
        >
          <div style={{ position: 'relative', width: 1032, minWidth: 240, height: 34 }}>
            <input
              type="text"
              className="search-input"
              style={{
                boxSizing: 'border-box',
                width: 1032,
                minWidth: 240,
                height: 34,
                background: '#fff',
                border: '1px solid #E5E5E5',
                boxShadow: '0px 1px 2px rgba(0,0,0,0.04)',
                borderRadius: 10,
                padding: '9px 40px 9px 11px',
                fontFamily: 'Plus Jakarta Sans',
                fontWeight: 400,
                fontSize: 13,
                lineHeight: '16px',
                color: '#171717',
                textAlign: 'right',
                outline: 'none',
              }}
              // className="search-input"
              placeholder="חיפוש בקשות..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              dir="rtl"
            />
            {/* Search Icon */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: 11, top: 9, pointerEvents: 'none' }}>
              <circle cx="7.5" cy="7.5" r="5.5" stroke="#A3A3A3" strokeWidth="1.33333"/>
              <path d="M13 13L11 11" stroke="#A3A3A3" strokeWidth="1.33333" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
        {/* Search Results */}
        <div className="requests-list  rounded-[10px]  overflow-hidden mx-auto" style={{ padding: '7px 0' }}>
          {isLoading ? (
            <div className="p-6 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-5 bg-gray-200 rounded w-1/4 mb-2 mr-auto"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mr-auto"></div>
                </div>
              ))}
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-[#737373] text-[14px]">לא נמצאו בקשות</p>
            </div>
          ) : (
            filteredRequests
              .filter(r => ['PENDING', 'IN_PROGRESS', 'COMPLETED'].includes(r.status))
              .map((request, index) => (
                <FeatureRequestCard
                  key={request.id}
                  request={{
                    id: request.id,
                    title: request.title,
                    description: request.description,
                    upvotes: request._count?.votes ?? 0,
                    comments: request._count?.comments ?? 0,
                    date: request.createdAt,
                    creator: request.author?.name ?? request.authorId,
                    status: request.status as 'PENDING' | 'IN_PROGRESS' | 'COMPLETED',
                  }}
                  defaultExpanded={index === 0}
                />
              ))
          )}
        </div>
      </main>
    </div>
  );
}
