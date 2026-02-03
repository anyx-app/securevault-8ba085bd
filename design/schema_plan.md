# Schema Plan - SecureVault

## Overview
SecureVault requires a robust schema to handle multi-tenant organizations, encrypted vaults, secrets, role-based access control, and comprehensive auditing.

## Tables

### 1. `profiles`
- **Description**: Public profile information for users. Extends `auth.users`.
- **Columns**:
  - `id` (uuid, PK, FK -> auth.users.id)
  - `full_name` (text)
  - `avatar_url` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

### 2. `organizations`
- **Description**: Represents a business or team entity.
- **Columns**:
  - `id` (uuid, PK)
  - `name` (text)
  - `slug` (text, unique)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

### 3. `organization_members`
- **Description**: Links users to organizations with specific roles.
- **Columns**:
  - `id` (uuid, PK)
  - `organization_id` (uuid, FK -> organizations.id)
  - `user_id` (uuid, FK -> auth.users.id)
  - `role` (text, enum: 'owner', 'admin', 'member', 'viewer')
  - `created_at` (timestamptz)

### 4. `vaults`
- **Description**: Logical containers for secrets. Access is controlled at the vault level.
- **Columns**:
  - `id` (uuid, PK)
  - `organization_id` (uuid, FK -> organizations.id)
  - `name` (text)
  - `description` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

### 5. `secrets`
- **Description**: The actual encrypted credentials.
- **Columns**:
  - `id` (uuid, PK)
  - `vault_id` (uuid, FK -> vaults.id)
  - `title` (text)
  - `username` (text, encrypted locally before storage, but maybe plain for search if acceptable risk, stick to encrypted for now)
  - `encrypted_password` (text)
  - `encrypted_notes` (text)
  - `website_url` (text)
  - `totp_secret` (text, encrypted)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  - `last_modified_by` (uuid, FK -> auth.users.id)

### 6. `audit_logs`
- **Description**: Immutable record of system-wide actions (e.g., user added to org, vault created).
- **Columns**:
  - `id` (uuid, PK)
  - `organization_id` (uuid, FK -> organizations.id)
  - `actor_id` (uuid, FK -> auth.users.id)
  - `action` (text, e.g., 'CREATE_VAULT', 'DELETE_MEMBER')
  - `entity_type` (text)
  - `entity_id` (uuid)
  - `metadata` (jsonb)
  - `created_at` (timestamptz)

### 7. `access_logs`
- **Description**: Specific log for when a secret is retrieved/decrypted (audit trail for viewing credentials).
- **Columns**:
  - `id` (uuid, PK)
  - `secret_id` (uuid, FK -> secrets.id)
  - `user_id` (uuid, FK -> auth.users.id)
  - `access_type` (text, e.g., 'VIEW', 'COPY', 'EDIT')
  - `ip_address` (text)
  - `user_agent` (text)
  - `created_at` (timestamptz)

## Security Policies (RLS)

- **profiles**: Users can read all profiles in their orgs. Users can update their own.
- **organizations**: Members can read. Owners can update.
- **organization_members**: Members can read. Admins/Owners can invite/remove.
- **vaults**: Access depends on membership and potentially granular vault permissions (MVP: Org members see all vaults, or restricted by role).
- **secrets**: Only accessible if user has access to the parent vault.
- **audit/access logs**: Viewable by Admins/Owners only. Insert only system/triggers.
