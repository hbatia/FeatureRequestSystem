
import { useState } from 'react';
import { api } from '../lib/api';

export function NewFeatureRequestForm({ onClose }: { onClose: () => void }) {
  // TODO: Replace with real user id from auth context
  const userId = 'demo-user-id';
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [details, setDetails] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;
    try {
      await api.featureRequests.create({ title, description: desc, userId });
      onClose();
    } catch (err) {
      alert('שגיאה בשליחת הבקשה');
    }
  };
  return (
    <form onSubmit={handleSubmit} style={{ padding: 0, width: 560, maxWidth: 560, height: 628.28, position: 'relative', background: '#fff', borderRadius: 10, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', fontFamily: 'Plus Jakarta Sans, Rubik, Heebo, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px 24px', borderBottom: 'none' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 3, width: 242 }}>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans, Rubik, Heebo, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontWeight: 800, fontSize: 18, color: '#171717', margin: 0, lineHeight: '27px', letterSpacing: '-0.54px', textAlign: 'left' }}>הגש בקשה לפיצ'ר חדש</h2>
          <p style={{ fontFamily: 'Plus Jakarta Sans, Rubik, Heebo, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontWeight: 400, fontSize: 13, color: '#737373', margin: 0, lineHeight: '20px', textAlign: 'left' }}>שתף את הרעיון שלך ועזור לנו לשפר את המוצר</p>
        </div>
        <div style={{ width: 32, height: 32, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 6L14 14M14 6L6 14" stroke="#A3A3A3" strokeWidth="1.67" strokeLinecap="round"/></svg>
        </div>
      </div>
      {/* Body */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '23px 24px 24px', gap: 19, flex: 1 }}>
        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6, width: 510 }}>
          <label style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: 510, fontFamily: 'Plus Jakarta Sans, Rubik, Heebo, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontWeight: 700, fontSize: 13, color: '#404040', marginBottom: 0 }}>
            כותרת הבקשה
            <span style={{ color: '#DC2626', marginRight: 4 }}>*</span>
          </label>
          <input
            style={{ boxSizing: 'border-box', width: 510, height: 37, background: '#fff', border: '1px solid #E5E5E5', borderRadius: 8, padding: '9px 14px 7px', fontFamily: 'Plus Jakarta Sans, Rubik, Heebo, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontWeight: 400, fontSize: 14, color: '#171717', outline: 'none' }}
            maxLength={100}
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="תאר את הבקשה בקצרה..."
            required
          />
          <div style={{ width: 510, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', fontFamily: 'Plus Jakarta Sans, Rubik, Heebo, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontWeight: 400, fontSize: 11, color: '#A3A3A3' }}>{title.length} / 100</div>
        </div>
        {/* Description */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6, width: 510 }}>
          <label style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: 510, fontFamily: 'Plus Jakarta Sans, Rubik, Heebo, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontWeight: 700, fontSize: 13, color: '#404040', marginBottom: 0 }}>
            תיאור מפורט
            <span style={{ color: '#DC2626', marginRight: 4 }}>*</span>
          </label>
          <textarea
            style={{ boxSizing: 'border-box', width: 510, height: 120, minHeight: 120, background: '#fff', border: '1px solid #E5E5E5', borderRadius: 8, padding: '9px 14px 7px', fontFamily: 'Plus Jakarta Sans, Rubik, Heebo, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontWeight: 400, fontSize: 14, color: '#171717', outline: 'none', resize: 'none' }}
            value={desc}
            onChange={e => setDesc(e.target.value)}
            placeholder="הסבר מה הפיצ'ר אמור לעשות ולמה הוא חשוב..."
            required
          />
        </div>
        {/* Solution hint (static) */}
        <div style={{ width: 510, fontFamily: 'Plus Jakarta Sans, Rubik, Heebo, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontWeight: 400, fontSize: 12, color: '#A3A3A3', marginTop: 0, marginBottom: 0, textAlign: 'right' }}>
          תאר את הבעיה שאתה מנסה לפתור והפתרון המוצע
        </div>
        {/* Tips Card */}
        <div style={{ boxSizing: 'border-box', width: 510, background: 'linear-gradient(103.16deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.03) 100%)', border: '1px solid rgba(99, 102, 241, 0.1)', borderRadius: 8, padding: '16px 18px', marginTop: 8, fontFamily: 'Plus Jakarta Sans, Rubik, Heebo, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.99992 14.6666C11.6818 14.6666 14.6666 11.6818 14.6666 7.99992C14.6666 4.31802 11.6818 1.33325 7.99992 1.33325C4.31802 1.33325 1.33325 4.31802 1.33325 7.99992C1.33325 11.6818 4.31802 14.6666 7.99992 14.6666Z" stroke="#6366F1" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.06006 5.99989C6.21679 5.55434 6.52616 5.17863 6.93336 4.93931C7.34056 4.7 7.81932 4.61252 8.28484 4.69237C8.75036 4.77222 9.1726 5.01424 9.47678 5.37558C9.78095 5.73691 9.94743 6.19424 9.94673 6.66656C9.94673 7.99989 7.94673 8.66656 7.94673 8.66656" stroke="#6366F1" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 11.3333H8.00667" stroke="#6366F1" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span style={{ fontFamily: 'Plus Jakarta Sans, Rubik, Heebo, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontWeight: 700, fontSize: 12, color: '#6366F1' }}>טיפים לבקשה טובה</span>
          </div>
          <ul style={{ fontFamily: 'Plus Jakarta Sans, Rubik, Heebo, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontWeight: 400, fontSize: 11, color: '#525252', paddingRight: 16, margin: 0, listStyle: 'disc', textAlign: 'right' }}>
            <li>תאר את הבעיה לפני הפתרון - למה אתה צריך את זה?</li>
            <li>תן דוגמאות קונקרטיות של מקרי שימוש</li>
            <li>בדוק שאין כבר בקשה דומה לפני שתגיש</li>
          </ul>
        </div>
      </div>
      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 10, padding: '16px 24px', background: '#FAFAFA', borderTop: '1px solid #F5F5F5', borderRadius: '0 0 10px 10px' }}>
        <button type="button" onClick={onClose} style={{ background: '#fff', border: '1px solid #E5E5E5', borderRadius: 8, padding: '7px 16px', fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 13, color: '#404040', marginLeft: 8, minWidth: 67, height: 37.5, cursor: 'pointer' }}>ביטול</button>
        <button type="submit" style={{ background: 'linear-gradient(107.63deg, #6366F1 0%, #8B5CF6 100%)', boxShadow: '0px 1px 3px rgba(99, 102, 241, 0.3)', border: 'none', borderRadius: 8, padding: '9.75px 16px', fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 13, color: '#fff', minWidth: 122, height: 37.5, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
         <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 3V15" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/><path d="M3 9H15" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
          שלח בקשה
        </button>
      </div>
    </form>
  );
}
