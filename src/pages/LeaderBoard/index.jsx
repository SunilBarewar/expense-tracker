import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { getLeaderboardStats } from "../../api/PremiumRequests";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Table from "../../components/Table";
import { leaderBoardTableColumns } from "../../constants/tableColumns";

const LeaderBoard = () => {
  const { authState } = useContext(AuthContext);
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //   if (!authState?.isPremium) return null;
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      navigate("/", { replace: true });
      return;
    }
    console.log(state);
    (async () => {
      const { data } = await getLeaderboardStats();
      setUsersData(data);
    })();
  }, []);
  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full flex flex-col justify-center items-center p-2">
        <h1 className="text-2xl font-mono font-bold border-b-2 px-5 py-1 mb-5 text-zinc-700 border-purple-500">
          Leader Board
        </h1>
        <div className="w-full md:w-[80%] lg:w-[50%] text-center shadow-md">
          <Table
            columns={leaderBoardTableColumns}
            data={usersData}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
