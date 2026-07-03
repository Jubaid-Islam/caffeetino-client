import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FaEnvelope, FaCalendarAlt, FaCheckCircle, FaShieldAlt } from "react-icons/fa";

const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const Profile = () => {
    const { user } = useContext(AuthContext);

    const provider = user?.providerData?.[0]?.providerId
        ?.replace(".com", "")
        ?.replace("password", "Email/Password") || "Unknown";

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4  flex justify-center">
            <div className="max-w-3xl w-full mx-auto mt-30">

                <div className="w-full">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
                        <h2 className="text-xl font-bold text-stone-900 mb-5">Account Details</h2>

                        <div className="divide-y divide-stone-100">
                            <div className="flex items-center gap-4 py-4 first:pt-0">
                                <span className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                                    {user?.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user?.displayName}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        user?.displayName?.charAt(0).toUpperCase() || "U"
                                    )}
                                </span>
                                <div>
                                    <p className="text-xs text-stone-500">Name</p>
                                    <p className="font-semibold text-stone-900">  {user?.displayName || "User"}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 py-4 first:pt-0">
                                <span className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                                    <FaEnvelope className="text-amber-900" />
                                </span>
                                <div>
                                    <p className="text-xs text-stone-500">Email</p>
                                    <p className="font-semibold text-stone-900">{user?.email || "Not provided"}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 py-4">
                                <span className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                                    <FaCalendarAlt className="text-amber-900" />
                                </span>
                                <div>
                                    <p className="text-xs text-stone-500">Member Since</p>
                                    <p className="font-semibold text-stone-900">
                                        {formatDate(user?.metadata?.creationTime)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 py-4 last:pb-0">
                                <span className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                                    <FaShieldAlt className="text-amber-900" />
                                </span>
                                <div>
                                    <p className="text-xs text-stone-500">Signed in with</p>
                                    <p className="font-semibold text-stone-900 capitalize">{provider}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Profile;