import Container from '@/layout/driver/container'
import React from 'react'

// import Button from "@/components/button";
import Tabs from '@/components/tab';
import MagazineItem from '@/layout/driver/magazine/magazine-item';
import HistoryMagazineTable from '@/layout/driver/magazine/history-magazine-table';
import { useDriverMagazines, useDriverMagazinesPickup } from '@/services/magazine.service';
// Magazine data interface
interface Magazine {
    id: number;
    status: "pending_return" | "pending_pickup" | "active" | "returned";
    edition?: string;
    newEdition?: string;
    location?: string;
    buttonText: string;
    buttonAction: () => void;
}

// Sample Magazine Data Array
const magazineData: Magazine[] = [
    {
        id: 1,
        status: "pending_return",
        edition: "March Edition",
        buttonText: "Confirm Return",
        buttonAction: () => console.log("Confirmed return of March Edition")
    },
    {
        id: 2,
        status: "pending_pickup",
        newEdition: "April Edition",
        location: "Lagos, Nigeria",
        buttonText: "Confirm Pickup",
        buttonAction: () => console.log("Confirmed pickup of April Edition")
    },
    {
        id: 3,
        status: "pending_pickup",
        newEdition: "May Edition",
        location: "Ikeja Hub, Lagos",
        buttonText: "Confirm Pickup",
        buttonAction: () => console.log("Confirmed pickup of May Edition")
    },
    {
        id: 4,
        status: "pending_return",
        edition: "February Edition",
        buttonText: "Confirm Return",
        buttonAction: () => console.log("Confirmed return of February Edition")
    }
];


function Earnings() {
    const { data } = useDriverMagazines();
    const { data: pickupData } = useDriverMagazinesPickup()
    // const magazineData = data?.magazines || [];
    console.log("Magazine Data:", data?.magazines);
    console.log("Pickup Magazine Data:", pickupData);
    const tabsData: any = [
        {
            title: "Magazine Pickup/Return",
            content: <div className="space-y-6">
                {magazineData.map((magazine:any) => (
                    <MagazineItem key={magazine.id} magazine={magazine} />
                ))}
            </div>
        },
        {
            title: "History of Magazines",
            content:< HistoryMagazineTable magazineData={data?.magazines || []} />
        }
    ];

    return (
      <Container title="Magazines" active="Magazines">
        <section className="py-6 h-full overflow-y-auto scrollbar-none">
          <Tabs tabs={tabsData} defaultTab={0} />
        </section>
      </Container>
    );

}

export default Earnings
