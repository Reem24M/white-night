import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Check, X, Info, MapPin } from "lucide-react";

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const API_BASE_URL = "https://your-domain.com"; 
  const token = localStorage.getItem("token");

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE_URL}/owner/requests`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(data.requests);
    } catch (error) {
      toast.error("FAILED TO LOAD REQUESTS");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // 2. معالجة القبول أو الرفض (PATCH)
  const handleAction = async (requestId, action) => {
    try {
      const endpoint = `${API_BASE_URL}/owner/requests/${requestId}/${action}`;
      await axios.patch(endpoint, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success(`REQUEST ${action.toUpperCase()}ED SUCCESSFULLY`, {
        style: { background: action === 'approve' ? '#ECFDF5' : '#FEF2F2', color: action === 'approve' ? '#059669' : '#DC2626' }
      });
      
      // تحديث القائمة بعد الأكشن
      fetchRequests();
    } catch (error) {
      toast.error(error.response?.data?.message || "ACTION FAILED");
    }
  };

  if (loading) return (
    <div className="flex h-96 items-center justify-center italic font-black text-[#D4AF37] animate-pulse uppercase tracking-widest">
      Fetching Requests...
    </div>
  );

  return (
    <div className="p-2 animate-in fade-in slide-in-from-bottom-4 duration-700 italic">
      <div className="mb-10">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-gray-800">
          Owner <span className="text-[#D4AF37]">Requests</span>
        </h1>
        <p className="text-xs font-bold text-gray-400 uppercase mt-1 tracking-widest">
          Pending authorization for new venue partners
        </p>
      </div>

      <div className="grid gap-6">
        {requests.length > 0 ? (
          requests.map((req) => (
            <div key={req._id} className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all group">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                
                {/* User & Hall Info */}
                <div className="flex gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-[#D4AF37]/20 flex items-center justify-center overflow-hidden">
                    {req.coverPhoto ? (
                      <img src={req.coverPhoto.url} alt="hall" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[#D4AF37] font-black text-xl">{req.name?.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase text-gray-800 tracking-tight group-hover:text-[#D4AF37] transition-colors">
                      {req.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-gray-500 font-bold text-[10px] uppercase">
                      <span className="text-black italic">{req.user?.fullname}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><MapPin size={10}/> {req.address?.governorate}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2 font-medium">
                      PH: {req.user?.phone} | {req.user?.email}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 self-end md:self-center">
                  <button 
                    onClick={() => handleAction(req._id, 'approve')}
                    className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase hover:bg-[#D4AF37] transition-all shadow-lg shadow-gray-200"
                  >
                    <Check size={14} strokeWidth={3}/> Approve
                  </button>
                  <button 
                    onClick={() => handleDecision(req._id, 'reject')} // تم تصحيح الاسم لـ handleAction
                    onClick={() => handleAction(req._id, 'reject')}
                    className="flex items-center gap-2 border-2 border-gray-100 text-gray-400 px-6 py-3 rounded-2xl text-[10px] font-black uppercase hover:border-red-100 hover:text-red-500 transition-all"
                  >
                    <X size={14} strokeWidth={3}/> Reject
                  </button>
                </div>

              </div>
              
              {/* Description Preview */}
              {req.description && (
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-start gap-2">
                  <Info size={12} className="text-[#D4AF37] mt-0.5" />
                  <p className="text-[10px] text-gray-400 font-bold leading-relaxed lowercase italic">
                    "{req.description.substring(0, 150)}..."
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="h-64 border-2 border-dashed border-gray-100 rounded-[3rem] flex flex-col items-center justify-center text-gray-300">
            <Clock size={40} strokeWidth={1} className="mb-3 opacity-20"/>
            <p className="font-black uppercase tracking-[0.3em] text-[10px]">No Pending Request At The Moment</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingRequests;