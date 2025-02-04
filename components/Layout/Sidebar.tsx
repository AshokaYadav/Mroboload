// components/Sidebar.tsx

import SidebarLink from "./SidebarLinkProps";


export default function Sidebar() {
  return (
    <ul>
      <SidebarLink href="/Dashboard">Dashboard</SidebarLink>
      <SidebarLink href="/ID-Management">ID Management</SidebarLink>
      <SidebarLink href="/Tasks">Tasks</SidebarLink>
      <SidebarLink href="/Add-Instruments">Add Mobikwik</SidebarLink>
      <SidebarLink href="/Details">Task History</SidebarLink>
      <SidebarLink href="/Control-Panel">Control Panel</SidebarLink>
      <SidebarLink href="/TransactionData">TransactionData</SidebarLink>
      <SidebarLink href="/Extra-Management">Extra Management</SidebarLink>
    </ul>
  );
}
