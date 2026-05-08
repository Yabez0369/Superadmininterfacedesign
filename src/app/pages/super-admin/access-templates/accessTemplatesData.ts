export type RiskLevel = 'Low' | 'Medium' | 'High' | 'System';

export type AccessRole = {
  id: string;
  name: string;
  scope: 'Tenant' | 'Outlet' | 'Personal';
  risk: RiskLevel;
  purpose: string;
  allowed: string[];
  restricted: string[];
  usedByCount: number;
};

export type RolePack = {
  id: string;
  name: string;
  businessType: 'Retail Store' | 'Restaurant' | 'Grocery / Supermarket' | 'Warehouse + Retail' | 'Custom';
  roles: AccessRole[];
  permissionCount: number;
  assignedTenants: number;
  status: 'Active' | 'Draft' | 'Deprecated';
  customRolesAllowed: boolean;
  enabledModules: string[];
};

export type PermissionRight = {
  key: string;
  module: 'POS' | 'Catalog' | 'Inventory' | 'Staff' | 'Reports' | 'Settings' | 'Audit';
  description: string;
  risk: RiskLevel;
  usedInRoles: number;
  status: 'Active' | 'Deprecated';
};

export type UserGroupTemplate = {
  id: string;
  name: string;
  businessType: RolePack['businessType'];
  groups: string[];
  mappedRolePackId: string;
};

export const ROLE_PACKS: RolePack[] = [
  {
    id: 'retail-standard',
    name: 'Retail POS Standard Pack',
    businessType: 'Retail Store',
    permissionCount: 148,
    assignedTenants: 32,
    status: 'Active',
    customRolesAllowed: true,
    enabledModules: ['POS Checkout', 'Product Catalog', 'Inventory', 'Outlet Management', 'Staff Management', 'Reports', 'Audit Logs'],
    roles: [
      {
        id: 'tenant-admin',
        name: 'Tenant Admin',
        scope: 'Tenant',
        risk: 'High',
        purpose: 'Owns tenant configuration, outlets, staff access boundaries, and security policies.',
        allowed: ['Tenant settings', 'Outlet management', 'Staff role assignment', 'Reports access'],
        restricted: ['Platform billing', 'System audit retention'],
        usedByCount: 1,
      },
      {
        id: 'outlet-manager',
        name: 'Outlet Manager',
        scope: 'Outlet',
        risk: 'Medium',
        purpose: 'Runs day-to-day outlet operations including staff supervision and cash controls.',
        allowed: ['POS refunds (request)', 'Shift management', 'Cash drawer close'],
        restricted: ['Tax settings', 'Global permissions'],
        usedByCount: 5,
      },
      {
        id: 'cashier',
        name: 'Cashier',
        scope: 'Outlet',
        risk: 'Low',
        purpose: 'Executes sales, basic customer handling, and receipt workflows.',
        allowed: ['Create sale', 'Apply discounts (limited)', 'Print receipt'],
        restricted: ['Refund approval', 'Stock adjustments'],
        usedByCount: 24,
      },
      {
        id: 'stock-keeper',
        name: 'Stock Keeper',
        scope: 'Outlet',
        risk: 'Medium',
        purpose: 'Maintains inventory and stock movements for a store/outlet.',
        allowed: ['Stock view', 'Receiving', 'Transfers (request)'],
        restricted: ['Price updates', 'Sales reports'],
        usedByCount: 8,
      },
      {
        id: 'maintenance',
        name: 'Maintenance Staff',
        scope: 'Personal',
        risk: 'Low',
        purpose: 'Limited access for support and maintenance tasks within a store.',
        allowed: ['View devices', 'View outlet status'],
        restricted: ['Sales', 'Inventory', 'Staff'],
        usedByCount: 5,
      },
    ],
  },
  {
    id: 'restaurant-standard',
    name: 'Restaurant POS Standard Pack',
    businessType: 'Restaurant',
    permissionCount: 162,
    assignedTenants: 19,
    status: 'Active',
    customRolesAllowed: true,
    enabledModules: ['POS Checkout', 'Product Catalog', 'Shift Management', 'Cash Drawer', 'Reports', 'Audit Logs'],
    roles: [],
  },
  {
    id: 'grocery-pack',
    name: 'Grocery / Supermarket Pack',
    businessType: 'Grocery / Supermarket',
    permissionCount: 175,
    assignedTenants: 11,
    status: 'Active',
    customRolesAllowed: false,
    enabledModules: ['POS Checkout', 'Product Catalog', 'Inventory', 'Promotions', 'Reports', 'Audit Logs'],
    roles: [],
  },
  {
    id: 'warehouse-retail',
    name: 'Warehouse + Retail Pack',
    businessType: 'Warehouse + Retail',
    permissionCount: 186,
    assignedTenants: 7,
    status: 'Active',
    customRolesAllowed: false,
    enabledModules: ['Inventory', 'Product Catalog', 'Outlet Management', 'Audit Logs', 'Reports'],
    roles: [],
  },
  {
    id: 'custom-starter',
    name: 'Custom Starter Pack',
    businessType: 'Custom',
    permissionCount: 96,
    assignedTenants: 3,
    status: 'Draft',
    customRolesAllowed: true,
    enabledModules: ['POS Checkout', 'Product Catalog'],
    roles: [],
  },
];

export const PERMISSIONS: PermissionRight[] = [
  { key: 'pos.sale.create', module: 'POS', description: 'Create a new sale transaction at checkout.', risk: 'Low', usedInRoles: 6, status: 'Active' },
  { key: 'pos.sale.cancel', module: 'POS', description: 'Cancel an in-progress sale before completion.', risk: 'Medium', usedInRoles: 4, status: 'Active' },
  { key: 'pos.refund.request', module: 'POS', description: 'Request a refund for a completed sale.', risk: 'Medium', usedInRoles: 3, status: 'Active' },
  { key: 'pos.refund.approve', module: 'POS', description: 'Approve refunds and finalize the refund workflow.', risk: 'High', usedInRoles: 2, status: 'Active' },
  { key: 'pos.discount.apply', module: 'POS', description: 'Apply discounts during checkout within configured limits.', risk: 'Medium', usedInRoles: 4, status: 'Active' },
  { key: 'catalog.product.view', module: 'Catalog', description: 'View products in the catalog.', risk: 'Low', usedInRoles: 5, status: 'Active' },
  { key: 'catalog.product.create', module: 'Catalog', description: 'Create new products and variants.', risk: 'Medium', usedInRoles: 2, status: 'Active' },
  { key: 'catalog.price.update', module: 'Catalog', description: 'Update product pricing and price lists.', risk: 'High', usedInRoles: 1, status: 'Active' },
  { key: 'inventory.stock.view', module: 'Inventory', description: 'View stock on hand and availability.', risk: 'Low', usedInRoles: 4, status: 'Active' },
  { key: 'inventory.stock.adjust', module: 'Inventory', description: 'Adjust stock levels with reason codes.', risk: 'High', usedInRoles: 2, status: 'Active' },
  { key: 'staff.user.create', module: 'Staff', description: 'Create staff accounts in the tenant workspace.', risk: 'High', usedInRoles: 2, status: 'Active' },
  { key: 'staff.role.assign', module: 'Staff', description: 'Assign roles to staff accounts.', risk: 'High', usedInRoles: 2, status: 'Active' },
  { key: 'reports.sales.view', module: 'Reports', description: 'View sales reports for outlets and shifts.', risk: 'Medium', usedInRoles: 3, status: 'Active' },
  { key: 'settings.outlet.update', module: 'Settings', description: 'Update outlet settings and device configurations.', risk: 'High', usedInRoles: 2, status: 'Active' },
  { key: 'audit.logs.view', module: 'Audit', description: 'View audit logs for sensitive events.', risk: 'System', usedInRoles: 1, status: 'Active' },
];

export const USER_GROUP_TEMPLATES: UserGroupTemplate[] = [
  {
    id: 'retail-staff-group',
    name: 'Retail Store Staff Group',
    businessType: 'Retail Store',
    groups: ['Admin Group', 'Outlet Operations', 'POS Cashiers', 'Inventory Team', 'Support / Maintenance'],
    mappedRolePackId: 'retail-standard',
  },
  {
    id: 'restaurant-staff-group',
    name: 'Restaurant Staff Group',
    businessType: 'Restaurant',
    groups: ['Admin Group', 'Floor Managers', 'POS Cashiers', 'Kitchen Ops', 'Support / Maintenance'],
    mappedRolePackId: 'restaurant-standard',
  },
  {
    id: 'warehouse-staff-group',
    name: 'Warehouse Staff Group',
    businessType: 'Warehouse + Retail',
    groups: ['Admin Group', 'Warehouse Ops', 'Stock Team', 'Dispatch', 'Support / Maintenance'],
    mappedRolePackId: 'warehouse-retail',
  },
  {
    id: 'supermarket-staff-group',
    name: 'Supermarket Staff Group',
    businessType: 'Grocery / Supermarket',
    groups: ['Admin Group', 'POS Cashiers', 'Inventory Team', 'Pricing Team', 'Support / Maintenance'],
    mappedRolePackId: 'grocery-pack',
  },
];

export function getRolePackById(packId: string | undefined) {
  return ROLE_PACKS.find((p) => p.id === packId) ?? ROLE_PACKS[0];
}

