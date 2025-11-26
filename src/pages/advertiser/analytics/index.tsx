import Container from "@/layout/advertiser/container";
import Stats from "@/ui/stats";
import CampaignTable from "@/layout/advertiser/tables/campaigns";
import { campaignData } from "@/data/campaign";
import { CustomGraph } from "@/layout/general/graph/CustomGraph";
import { QuickActions } from "@/layout/advertiser/quick-actions";
import SelectSearch from "@/components/input/selectSearch";
import DateSort from "@/components/input/dateSort";
import Pagination from "@/components/pagination";
import { useState, useMemo } from "react";

function Earnings() {


const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage=10
  const totalItems = 250;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const pagedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return campaignData.slice(start, start + itemsPerPage);
  }, [currentPage, itemsPerPage]);

  

  const Statistics: any = [
    {
      icon: null,
      title: "Active Campaigns",
      figure: "500",
    },
    {
      icon: null,
      title: "Impressions",
      figure: "500",
    },
  ];

  return (
    <Container title="Analytics" active="Analytics">
      <section className="w-full py-6  flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row items-stretch sm:items-center gap-15 mb-1 rounded-lg bg-[#C5E4FF] p-[30px] sm:p-[42px]">
          <SelectSearch
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "inactive" },
            ]}
            placeholder="Select Campaign"
            className="w-full "
          />
          <DateSort
            onDateChange={(dates) => console.log("Dates changed:", dates)}
          />
        </div>
        <div className="flex w-full flex-col gap-3">
          <Stats grid={2} data={Statistics} />
        </div>

        <CustomGraph h="h-90" title="Campaign Performance" />
        <div className=" overflow-hidden">
          <CampaignTable compactHeader data={campaignData} />
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(p) => setCurrentPage(p)}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </div>
      </section>
    </Container>
  );
}

export default Earnings;
