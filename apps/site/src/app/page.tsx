import StrikeDashBoard from "./home/StrikeDashBoard";
import { getActionData } from "@/utils";

export default async function Home({ searchParams }: {
    searchParams: { [key: string]: string }
}) {

    const actionData = await getActionData(searchParams['action']);

    return (
        <StrikeDashBoard {...actionData} />
    );
}
