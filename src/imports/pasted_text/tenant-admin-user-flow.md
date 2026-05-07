Design a complete Tenant Admin user flow for a Unified Commerce POS SaaS platform.

The flow includes:
1. Tenant Admin creating a new outlet
2. Tenant Admin creating or assigning staff roles for that outlet
3. Tenant Admin creating staff users such as Outlet Manager, Cashier, Maintenance Staff, and Stock Keeper
4. Tenant Admin assigning staff to an outlet with role-based access

PRODUCT CONTEXT:
This is a multi-tenant POS SaaS platform.
Tenant Admin manages one business/tenant.
Tenant Admin can manage outlets, staff, roles, permissions, inventory access, POS access, and outlet-level operations.
This is not Super Admin. Do not show platform-level tenant management, subscriptions across tenants, or platform health.

DESIGN DIRECTION:
Create a clean, premium, modern, light SaaS UI.
Use the same visual direction as a world-class POS SaaS platform:
- Soft white / light blue-gray background
- White cards
- Deep navy text
- Indigo/blue primary accent
- Minimal semantic colors
- Strong hierarchy
- Good whitespace
- Calm enterprise look
- Avoid dark-heavy UI
- Avoid too many colors
- Avoid messy card overload

GLOBAL LAYOUT:
Use a Tenant Admin layout with:
- Left sidebar
- Top header
- Main content area

LEFT SIDEBAR:
Logo: Unified Commerce
Label: Tenant Admin Portal

Menu items:
1. Dashboard
2. Outlets
3. Staff & Roles
4. Products
5. Inventory
6. POS Settings
7. Online Store
8. Reports
9. Settings

Active state:
- Soft indigo background
- Indigo left border
- Clean icon and label

TOP HEADER:
- Search input: “Search outlets, staff, products…”
- Current business name selector
- Notification icon
- Help icon
- Tenant Admin profile dropdown

IMPORTANT UX RULE:
Tenant Admin sees only their own tenant/business data.
Tenant Admin does not manage other tenants or platform-wide settings.

PAGES TO DESIGN:

PAGE 1: TENANT ADMIN DASHBOARD
Purpose:
Give the tenant admin a business-level overview.

Sections:
- Page title: Business Dashboard
- Subtitle: Manage outlets, staff, roles, inventory, and operational setup.
- KPI cards:
  1. Total Outlets
  2. Active Staff
  3. Low Stock Alerts
  4. Pending Setup Tasks
- Main card: Outlet Setup Progress
- Card: Recent Staff Activity
- Card: Outlet Status
- Card: Quick Actions
  - Create Outlet
  - Add Staff
  - Configure Roles
  - View Inventory

PAGE 2: OUTLET MANAGEMENT / OUTLET LIST
Purpose:
Tenant Admin sees and manages all outlets under their business.

Sections:
- Page title: Outlet Management
- Primary CTA: Create Outlet
- Search bar: Search by outlet name, city, manager
- Filters:
  - Status
  - City / Region
  - Outlet Type
  - Manager Assigned
- Outlet table/card list columns:
  - Outlet Name
  - Outlet Code
  - City / Region
  - Manager
  - Staff Count
  - POS Status
  - Inventory Status
  - Status
  - Actions
- Empty state:
  If no outlet exists, show:
  “Create your first outlet to start selling.”
  Button: Create Outlet

PAGE 3: CREATE OUTLET — OUTLET DETAILS
Purpose:
First step of outlet creation wizard.

Layout:
- Breadcrumb: Outlets / Create Outlet
- Page title: Create New Outlet
- Stepper:
  1. Outlet Details
  2. Outlet Settings
  3. Assign Staff
  4. Review & Confirm

Main form card: Outlet Details

Sections:
A. Outlet Identity
- Outlet Name
- Outlet Code
- Outlet Type
  Options: Retail Store, Warehouse, Pickup Point, Kiosk, Pop-up Store
- Outlet Status
  Default: Active

B. Contact Information
- Outlet Phone Number
- Outlet Email
- Contact Person

C. Address
- Address Line 1
- Address Line 2
- City
- State / Province
- Postal Code
- Country

D. Operating Hours
- Opening Time
- Closing Time
- Working Days
- Time Zone

Right side panel:
- Setup Progress
- What happens next?
- Tip: “You can assign manager and cashier users after creating the outlet.”

Bottom actions:
- Cancel
- Save Draft
- Continue to Outlet Settings

PAGE 4: CREATE OUTLET — OUTLET SETTINGS
Purpose:
Configure operational settings for the new outlet.

Sections:
A. POS Settings
- Enable POS at this outlet toggle
- Receipt prefix
- Default payment methods:
  - Cash
  - Card
  - QR / Digital Payment
- Offline POS enabled toggle
- Cash drawer enabled toggle

B. Inventory Settings
- Enable inventory tracking toggle
- Allow negative stock toggle
- Low-stock alert enabled toggle
- Default low-stock threshold

C. Return & Discount Rules
- Return window in days
- Require manager approval for out-of-policy returns toggle
- Cashier discount limit percentage
- Require manager PIN above limit toggle

D. Hardware Setup
- Barcode scanner support enabled
- Receipt printer enabled
- Customer display enabled

Right side summary:
- POS enabled / disabled
- Inventory enabled / disabled
- Offline mode status
- Approval rules summary

Bottom actions:
- Back
- Save Draft
- Continue to Assign Staff

PAGE 5: CREATE OUTLET — ASSIGN STAFF
Purpose:
Assign existing staff or create new staff for this outlet.

Sections:
- Page title: Assign Staff to Outlet
- Explanation: “Assign outlet manager, cashiers, stock keepers, and maintenance staff.”

Primary roles section:
1. Outlet Manager
- Assign existing user button
- Create new user button
- Role description:
  “Manages daily outlet operations, staff activity, overrides, stock alerts, and outlet settings.”

2. Cashiers
- Add cashier button
- Table/list:
  - Name
  - Email
  - Shift Access
  - POS Access
  - Status

3. Stock Keepers
- Add stock keeper button
- Role description:
  “Manages stock receiving, stock adjustments, inventory counts, and low-stock review.”

4. Maintenance Staff
- Add maintenance staff button
- Role description:
  “Can manage hardware status, device setup, printer/scanner checks, and support tasks.”

Right side:
- Staff assignment summary
- Required roles checklist:
  - At least one Outlet Manager recommended
  - At least one Cashier recommended
  - Stock Keeper optional
  - Maintenance Staff optional

Bottom actions:
- Back
- Save Draft
- Continue to Review

PAGE 6: CREATE OUTLET — REVIEW & CONFIRM
Purpose:
Final review before creating outlet.

Sections:
Review cards:
1. Outlet Details
2. Contact & Address
3. Operating Hours
4. POS Settings
5. Inventory Settings
6. Return & Discount Rules
7. Assigned Staff

Each card has Edit link.

Warning/info note:
“This will create a new outlet under your business. Staff assigned to this outlet will only access outlet-scoped screens based on their role permissions.”

Confirmation checkbox:
“I confirm the outlet details and staff assignments are correct.”

Bottom actions:
- Back
- Save Draft
- Create Outlet

PAGE 7: OUTLET CREATED SUCCESSFULLY
Purpose:
Success state.

Sections:
- Success icon
- Heading: Outlet Created Successfully
- Outlet name and outlet code
- Staff assignment summary
- Next steps:
  - Configure products for outlet
  - Set opening stock
  - Test POS device
  - Invite staff users
- Primary CTA: View Outlet
- Secondary CTA: Create Another Outlet

PAGE 8: OUTLET DETAIL PAGE
Purpose:
View and manage one outlet.

Sections:
Header:
- Outlet name
- Outlet code
- Status badge
- Manager name
- Actions:
  - Edit Outlet
  - Assign Staff
  - Configure POS
  - Deactivate Outlet

Summary cards:
- Staff Count
- POS Status
- Inventory Tracking
- Low Stock Alerts
- Offline POS Status
- Last Activity

Main tabs:
1. Overview
2. Staff
3. POS Settings
4. Inventory Settings
5. Hardware
6. Activity Log

PAGE 9: STAFF & ROLES OVERVIEW
Purpose:
Manage staff users and role templates.

Sections:
- Page title: Staff & Roles
- Primary CTA: Add Staff
- Secondary CTA: Manage Roles
- Search bar
- Filters:
  - Role
  - Outlet
  - Status
  - Last Active
- Staff table:
  - Staff Name
  - Email
  - Role
  - Assigned Outlet
  - Status
  - Last Active
  - Actions
- Role summary cards:
  - Outlet Managers
  - Cashiers
  - Stock Keepers
  - Maintenance Staff

PAGE 10: ROLE TEMPLATES / PERMISSION MATRIX
Purpose:
Show role permissions in a clean matrix.

Roles:
1. Outlet Manager
2. Cashier
3. Stock Keeper
4. Maintenance Staff

Permission groups:
A. POS Access
- Open POS
- Create sale
- Hold / recall sale
- Process return
- Apply discount
- Request manager override

B. Inventory Access
- View inventory
- Adjust stock
- Receive stock
- Set low-stock threshold
- Transfer stock

C. Outlet Management
- View outlet dashboard
- Edit outlet settings
- Manage staff
- Configure hardware

D. Reports
- View daily sales summary
- View stock reports
- Export reports

E. Hardware / Maintenance
- View hardware status
- Configure printer
- Configure scanner
- Test customer display

Use checkmarks and disabled states.
Use clean table layout.
Do not make it colorful or cluttered.

PAGE 11: CREATE ROLE / EDIT ROLE
Purpose:
Create a custom outlet role or edit a role.

Sections:
- Role Name
- Role Description
- Scope:
  - Tenant-wide
  - Outlet-specific
- Permission groups with toggles:
  - POS
  - Inventory
  - Staff
  - Reports
  - Hardware
  - Settings
- Right side:
  - Permission summary
  - Risk warning for sensitive permissions
- Actions:
  - Cancel
  - Save Role

PAGE 12: CREATE STAFF USER
Purpose:
Create a new staff user and assign outlet role.

Sections:
A. Staff Identity
- First Name
- Last Name
- Email
- Phone Number
- Employee ID

B. Work Assignment
- Assigned Outlet
- Role
  Options:
  - Outlet Manager
  - Cashier
  - Stock Keeper
  - Maintenance Staff
- Shift Access
- Employment Status

C. Login & Security
- Invite by email
- Temporary password
- Require password reset on first login
- Manager PIN setup if role is Outlet Manager
- Enable 2FA toggle

D. Permission Preview
- Show what this staff member can access based on selected role

Right side:
- Role description
- Access summary
- Security note

Actions:
- Cancel
- Save Draft
- Create Staff User

PAGE 13: STAFF USER DETAIL
Purpose:
View and manage one staff user.

Sections:
Header:
- Staff name
- Role badge
- Status badge
- Assigned outlet
- Actions:
  - Edit
  - Reset Password
  - Deactivate
  - Remove From Outlet

Summary:
- Role
- Assigned outlet
- Last active
- Login status
- 2FA status

Tabs:
1. Profile
2. Role & Permissions
3. Outlet Assignment
4. Activity Log

PAGE 14: STAFF CREATED SUCCESSFULLY
Purpose:
Success state after staff creation.

Sections:
- Success icon
- Heading: Staff User Created Successfully
- Staff name
- Assigned outlet
- Assigned role
- Invite status
- Next steps:
  - Send invite email
  - Configure shift access
  - Review permissions
  - Add another staff user
- Primary CTA: View Staff Profile
- Secondary CTA: Add Another Staff

MODALS / DRAWERS TO DESIGN:
1. Cancel Outlet Creation Confirmation
2. Save Outlet Draft Confirmation
3. Assign Existing Staff Modal
4. Create New Staff Quick Modal
5. Role Permission Preview Drawer
6. Deactivate Staff Confirmation
7. Remove Staff From Outlet Confirmation
8. Reset Staff Password / Invite Modal

UX RULES:
- Keep hierarchy very clear.
- Tenant Admin flow should feel operational, not platform-level.
- Do not overload pages with too many cards.
- Use tables for staff lists and permission matrices.
- Use stepper for outlet creation.
- Use one primary CTA per screen.
- Use semantic colors only for status and warnings.
- Make forms easy to scan and complete.
- Design should feel premium, calm, clean, and production-ready.