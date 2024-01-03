"use strict";define(function(){return{"tactics":[{"id":"D3-AI","name":"Asset Inventory","short_name":"d3f:AssetInventory","sort_order":0},{"id":"D3-NM","name":"Network Mapping","short_name":"d3f:NetworkMapping","sort_order":1},{"id":"D3-OAM","name":"Operational Activity Mapping","short_name":"d3f:OperationalActivityMapping","sort_order":2},{"id":"D3-SYSM","name":"System Mapping","short_name":"d3f:SystemMapping","sort_order":3},{"id":"D3-AH","name":"Application Hardening","short_name":"d3f:ApplicationHardening","sort_order":4},{"id":"D3-CH","name":"Credential Hardening","short_name":"d3f:CredentialHardening","sort_order":5},{"id":"D3-MH","name":"Message Hardening","short_name":"d3f:MessageHardening","sort_order":6},{"id":"D3-PH","name":"Platform Hardening","short_name":"d3f:PlatformHardening","sort_order":7},{"id":"D3-FA","name":"File Analysis","short_name":"d3f:FileAnalysis","sort_order":8},{"id":"D3-ID","name":"Identifier Analysis","short_name":"d3f:IdentifierAnalysis","sort_order":9},{"id":"D3-MA","name":"Message Analysis","short_name":"d3f:MessageAnalysis","sort_order":10},{"id":"D3-NTA","name":"Network Traffic Analysis","short_name":"d3f:NetworkTrafficAnalysis","sort_order":11},{"id":"D3-PM","name":"Platform Monitoring","short_name":"d3f:PlatformMonitoring","sort_order":12},{"id":"D3-PA","name":"Process Analysis","short_name":"d3f:ProcessAnalysis","sort_order":13},{"id":"D3-UBA","name":"User Behavior Analysis","short_name":"d3f:UserBehaviorAnalysis","sort_order":14},{"id":"D3-EI","name":"Execution Isolation","short_name":"d3f:ExecutionIsolation","sort_order":15},{"id":"D3-NI","name":"Network Isolation","short_name":"d3f:NetworkIsolation","sort_order":16},{"id":"D3-DE","name":"Decoy Environment","short_name":"d3f:DecoyEnvironment","sort_order":17},{"id":"D3-DO","name":"Decoy Object","short_name":"d3f:DecoyObject","sort_order":18},{"id":"D3-CE","name":"Credential Eviction","short_name":"d3f:CredentialEviction","sort_order":19},{"id":"D3-FEV","name":"File Eviction","short_name":"d3f:FileEviction","sort_order":20},{"id":"D3-PE","name":"Process Eviction","short_name":"d3f:ProcessEviction","sort_order":21},{"id":"D3-RA","name":"Restore Access","short_name":"d3f:RestoreAccess","sort_order":22},{"id":"D3-RO","name":"Restore Object","short_name":"d3f:RestoreObject","sort_order":23}],"techniques":[{"id":"D3-KBPI","name":"Kernel-based Process Isolation","tactics":["d3f:ExecutionIsolation"],"url":"https://d3fend.mitre.org/technique/d3f:Kernel-basedProcessIsolation"},{"id":"D3-BSE","name":"Byte Sequence Emulation","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:ByteSequenceEmulation"},{"id":"D3-SDA","name":"Session Duration Analysis","tactics":["d3f:UserBehaviorAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:SessionDurationAnalysis"},{"id":"D3-CR","name":"Credential Revoking","tactics":["d3f:CredentialEviction"],"url":"https://d3fend.mitre.org/technique/d3f:CredentialRevoking"},{"id":"D3-WSAA","name":"Web Session Activity Analysis","tactics":["d3f:UserBehaviorAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:WebSessionActivityAnalysis"},{"id":"D3-SPP","name":"Strong Password Policy","tactics":["d3f:CredentialHardening"],"url":"https://d3fend.mitre.org/technique/d3f:StrongPasswordPolicy"},{"id":"D3-OTP","name":"One-time Password","tactics":["d3f:CredentialHardening"],"url":"https://d3fend.mitre.org/technique/d3f:One-timePassword"},{"id":"D3-DLIC","name":"Driver Load Integrity Checking","tactics":["d3f:PlatformHardening"],"url":"https://d3fend.mitre.org/technique/d3f:DriverLoadIntegrityChecking"},{"id":"D3-DQSA","name":"Database Query String Analysis","tactics":["d3f:ProcessAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:DatabaseQueryStringAnalysis"},{"id":"D3-DNSDL","name":"DNS Denylisting","tactics":["d3f:NetworkIsolation"],"url":"https://d3fend.mitre.org/technique/d3f:DNSDenylisting"},{"id":"D3-LFP","name":"Local File Permissions","tactics":["d3f:PlatformHardening"],"url":"https://d3fend.mitre.org/technique/d3f:LocalFilePermissions"},{"id":"D3-HCI","name":"Hardware Component Inventory","tactics":["d3f:AssetInventory"],"url":"https://d3fend.mitre.org/technique/d3f:HardwareComponentInventory"},{"id":"D3-PS","name":"Process Suspension","tactics":["d3f:ProcessEviction"],"url":"https://d3fend.mitre.org/technique/d3f:ProcessSuspension"},{"id":"D3-HD","name":"Homoglyph Detection","tactics":["d3f:IdentifierAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:HomoglyphDetection"},{"id":"D3-RTA","name":"RPC Traffic Analysis","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:RPCTrafficAnalysis"},{"id":"D3-CBAN","name":"Certificate-based Authentication","tactics":["d3f:CredentialHardening"],"url":"https://d3fend.mitre.org/technique/d3f:Certificate-basedAuthentication"},{"id":"D3-ANET","name":"Authentication Event Thresholding","tactics":["d3f:UserBehaviorAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:AuthenticationEventThresholding"},{"id":"D3-CCSA","name":"Credential Compromise Scope Analysis","tactics":["d3f:UserBehaviorAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:CredentialCompromiseScopeAnalysis"},{"id":"D3-FV","name":"Firmware Verification","tactics":["d3f:PlatformMonitoring"],"url":"https://d3fend.mitre.org/technique/d3f:FirmwareVerification"},{"id":"D3-FC","name":"File Carving","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:FileCarving"},{"id":"D3-SWI","name":"Software Inventory","tactics":["d3f:AssetInventory"],"url":"https://d3fend.mitre.org/technique/d3f:SoftwareInventory"},{"id":"D3-DEM","name":"Data Exchange Mapping","tactics":["d3f:SystemMapping"],"url":"https://d3fend.mitre.org/technique/d3f:DataExchangeMapping"},{"id":"D3-DF","name":"Decoy File","tactics":["d3f:DecoyObject"],"url":"https://d3fend.mitre.org/technique/d3f:DecoyFile"},{"id":"D3-MFA","name":"Multi-factor Authentication","tactics":["d3f:CredentialHardening"],"url":"https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication"},{"id":"D3-RTSD","name":"Remote Terminal Session Detection","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:RemoteTerminalSessionDetection"},{"id":"D3-IHN","name":"Integrated Honeynet","tactics":["d3f:DecoyEnvironment"],"url":"https://d3fend.mitre.org/technique/d3f:IntegratedHoneynet"},{"id":"D3-AZET","name":"Authorization Event Thresholding","tactics":["d3f:UserBehaviorAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:AuthorizationEventThresholding"},{"id":"D3-SYSVA","name":"System Vulnerability Assessment","tactics":["d3f:SystemMapping"],"url":"https://d3fend.mitre.org/technique/d3f:SystemVulnerabilityAssessment"},{"id":"D3-RC","name":"Restore Configuration","tactics":["d3f:RestoreObject"],"url":"https://d3fend.mitre.org/technique/d3f:RestoreConfiguration"},{"id":"D3-JFAPA","name":"Job Function Access Pattern Analysis","tactics":["d3f:UserBehaviorAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:JobFunctionAccessPatternAnalysis"},{"id":"D3-NTPM","name":"Network Traffic Policy Mapping","tactics":["d3f:NetworkMapping"],"url":"https://d3fend.mitre.org/technique/d3f:NetworkTrafficPolicyMapping"},{"id":"D3-PMAD","name":"Protocol Metadata Anomaly Detection","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:ProtocolMetadataAnomalyDetection"},{"id":"D3-TAAN","name":"Transfer Agent Authentication","tactics":["d3f:MessageHardening"],"url":"https://d3fend.mitre.org/technique/d3f:TransferAgentAuthentication"},{"id":"D3-ET","name":"Encrypted Tunnels","tactics":["d3f:NetworkIsolation"],"url":"https://d3fend.mitre.org/technique/d3f:EncryptedTunnels"},{"id":"D3-DNR","name":"Decoy Network Resource","tactics":["d3f:DecoyObject"],"url":"https://d3fend.mitre.org/technique/d3f:DecoyNetworkResource"},{"id":"D3-CRO","name":"Credential Rotation","tactics":["d3f:CredentialHardening"],"url":"https://d3fend.mitre.org/technique/d3f:CredentialRotation"},{"id":"D3-LLM","name":"Logical Link Mapping","tactics":["d3f:NetworkMapping"],"url":"https://d3fend.mitre.org/technique/d3f:LogicalLinkMapping"},{"id":"D3-OM","name":"Organization Mapping","tactics":["d3f:OperationalActivityMapping"],"url":"https://d3fend.mitre.org/technique/d3f:OrganizationMapping"},{"id":"D3-EAL","name":"Executable Allowlisting","tactics":["d3f:PlatformHardening"],"url":"https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting"},{"id":"D3-DA","name":"Dynamic Analysis","tactics":["d3f:FileAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:DynamicAnalysis"},{"id":"D3-SFCV","name":"Stack Frame Canary Validation","tactics":["d3f:ApplicationHardening"],"url":"https://d3fend.mitre.org/technique/d3f:StackFrameCanaryValidation"},{"id":"D3-DP","name":"Decoy Persona","tactics":["d3f:DecoyObject"],"url":"https://d3fend.mitre.org/technique/d3f:DecoyPersona"},{"id":"D3-RD","name":"Restore Database","tactics":["d3f:RestoreObject"],"url":"https://d3fend.mitre.org/technique/d3f:RestoreDatabase"},{"id":"D3-UAP","name":"User Account Permissions","tactics":["d3f:CredentialHardening"],"url":"https://d3fend.mitre.org/technique/d3f:UserAccountPermissions"},{"id":"D3-RUAA","name":"Restore User Account Access","tactics":["d3f:RestoreAccess"],"url":"https://d3fend.mitre.org/technique/d3f:RestoreUserAccountAccess"},{"id":"D3-AM","name":"Access Modeling","tactics":["d3f:OperationalActivityMapping"],"url":"https://d3fend.mitre.org/technique/d3f:AccessModeling"},{"id":"D3-ODM","name":"Operational Dependency Mapping","tactics":["d3f:OperationalActivityMapping"],"url":"https://d3fend.mitre.org/technique/d3f:OperationalDependencyMapping"},{"id":"D3-SVCDM","name":"Service Dependency Mapping","tactics":["d3f:SystemMapping"],"url":"https://d3fend.mitre.org/technique/d3f:ServiceDependencyMapping"},{"id":"D3-RPA","name":"Relay Pattern Analysis","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:RelayPatternAnalysis"},{"id":"D3-UGLPA","name":"User Geolocation Logon Pattern Analysis","tactics":["d3f:UserBehaviorAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis"},{"id":"D3-FH","name":"File Hashing","tactics":["d3f:FileAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:FileHashing"},{"id":"D3-DTP","name":"Domain Trust Policy","tactics":["d3f:CredentialHardening"],"url":"https://d3fend.mitre.org/technique/d3f:DomainTrustPolicy"},{"id":"D3-SHN","name":"Standalone Honeynet","tactics":["d3f:DecoyEnvironment"],"url":"https://d3fend.mitre.org/technique/d3f:StandaloneHoneynet"},{"id":"D3-MENCR","name":"Message Encryption","tactics":["d3f:MessageHardening"],"url":"https://d3fend.mitre.org/technique/d3f:MessageEncryption"},{"id":"D3-SCA","name":"System Call Analysis","tactics":["d3f:ProcessAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:SystemCallAnalysis"},{"id":"D3-RS","name":"Restore Software","tactics":["d3f:RestoreObject"],"url":"https://d3fend.mitre.org/technique/d3f:RestoreSoftware"},{"id":"D3-IOPR","name":"IO Port Restriction","tactics":["d3f:ExecutionIsolation"],"url":"https://d3fend.mitre.org/technique/d3f:IOPortRestriction"},{"id":"D3-CAA","name":"Connection Attempt Analysis","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:ConnectionAttemptAnalysis"},{"id":"D3-CHN","name":"Connected Honeynet","tactics":["d3f:DecoyEnvironment"],"url":"https://d3fend.mitre.org/technique/d3f:ConnectedHoneynet"},{"id":"D3-DAM","name":"Domain Account Monitoring","tactics":["d3f:UserBehaviorAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring"},{"id":"D3-CA","name":"Certificate Analysis","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:CertificateAnalysis"},{"id":"D3-SCP","name":"System Configuration Permissions","tactics":["d3f:PlatformHardening"],"url":"https://d3fend.mitre.org/technique/d3f:SystemConfigurationPermissions"},{"id":"D3-FCOA","name":"File Content Analysis","tactics":["d3f:FileAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:FileContentAnalysis"},{"id":"D3-ORA","name":"Operational Risk Assessment","tactics":["d3f:OperationalActivityMapping"],"url":"https://d3fend.mitre.org/technique/d3f:OperationalRiskAssessment"},{"id":"D3-DENCR","name":"Disk Encryption","tactics":["d3f:PlatformHardening"],"url":"https://d3fend.mitre.org/technique/d3f:DiskEncryption"},{"id":"D3-MAN","name":"Message Authentication","tactics":["d3f:MessageHardening"],"url":"https://d3fend.mitre.org/technique/d3f:MessageAuthentication"},{"id":"D3-EDL","name":"Executable Denylisting","tactics":["d3f:ExecutionIsolation"],"url":"https://d3fend.mitre.org/technique/d3f:ExecutableDenylisting"},{"id":"D3-FAPA","name":"File Access Pattern Analysis","tactics":["d3f:ProcessAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:FileAccessPatternAnalysis"},{"id":"D3-OSM","name":"Operating System Monitoring","tactics":["d3f:PlatformMonitoring"],"url":"https://d3fend.mitre.org/technique/d3f:OperatingSystemMonitoring"},{"id":"D3-SEA","name":"Script Execution Analysis","tactics":["d3f:ProcessAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:ScriptExecutionAnalysis"},{"id":"D3-PCSV","name":"Process Code Segment Verification","tactics":["d3f:ProcessAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:ProcessCodeSegmentVerification"},{"id":"D3-RNA","name":"Restore Network Access","tactics":["d3f:RestoreAccess"],"url":"https://d3fend.mitre.org/technique/d3f:RestoreNetworkAccess"},{"id":"D3-RF","name":"Restore File","tactics":["d3f:RestoreObject"],"url":"https://d3fend.mitre.org/technique/d3f:RestoreFile"},{"id":"D3-IBCA","name":"Indirect Branch Call Analysis","tactics":["d3f:ProcessAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:IndirectBranchCallAnalysis"},{"id":"D3-ACH","name":"Application Configuration Hardening","tactics":["d3f:ApplicationHardening"],"url":"https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening"},{"id":"D3-CI","name":"Configuration Inventory","tactics":["d3f:AssetInventory"],"url":"https://d3fend.mitre.org/technique/d3f:ConfigurationInventory"},{"id":"D3-DPR","name":"Decoy Public Release","tactics":["d3f:DecoyObject"],"url":"https://d3fend.mitre.org/technique/d3f:DecoyPublicRelease"},{"id":"D3-BAN","name":"Biometric Authentication","tactics":["d3f:CredentialHardening"],"url":"https://d3fend.mitre.org/technique/d3f:BiometricAuthentication"},{"id":"D3-NTF","name":"Network Traffic Filtering","tactics":["d3f:NetworkIsolation"],"url":"https://d3fend.mitre.org/technique/d3f:NetworkTrafficFiltering"},{"id":"D3-NTCD","name":"Network Traffic Community Deviation","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:NetworkTrafficCommunityDeviation"},{"id":"D3-PHDURA","name":"Per Host Download-Upload Ratio Analysis","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:PerHostDownload-UploadRatioAnalysis"},{"id":"D3-CP","name":"Certificate Pinning","tactics":["d3f:CredentialHardening"],"url":"https://d3fend.mitre.org/technique/d3f:CertificatePinning"},{"id":"D3-RAPA","name":"Resource Access Pattern Analysis","tactics":["d3f:UserBehaviorAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis"},{"id":"D3-SAOR","name":"Segment Address Offset Randomization","tactics":["d3f:ApplicationHardening"],"url":"https://d3fend.mitre.org/technique/d3f:SegmentAddressOffsetRandomization"},{"id":"D3-EHPV","name":"Exception Handler Pointer Validation","tactics":["d3f:ApplicationHardening"],"url":"https://d3fend.mitre.org/technique/d3f:ExceptionHandlerPointerValidation"},{"id":"D3-TBI","name":"TPM Boot Integrity","tactics":["d3f:PlatformHardening"],"url":"https://d3fend.mitre.org/technique/d3f:TPMBootIntegrity"},{"id":"D3-ANAA","name":"Administrative Network Activity Analysis","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:AdministrativeNetworkActivityAnalysis"},{"id":"D3-NVA","name":"Network Vulnerability Assessment","tactics":["d3f:NetworkMapping"],"url":"https://d3fend.mitre.org/technique/d3f:NetworkVulnerabilityAssessment"},{"id":"D3-IPCTA","name":"IPC Traffic Analysis","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:IPCTrafficAnalysis"},{"id":"D3-RFS","name":"RF Shielding","tactics":["d3f:PlatformHardening"],"url":"https://d3fend.mitre.org/technique/d3f:RFShielding"},{"id":"D3-DI","name":"Data Inventory","tactics":["d3f:AssetInventory"],"url":"https://d3fend.mitre.org/technique/d3f:DataInventory"},{"id":"D3-DCE","name":"Dead Code Elimination","tactics":["d3f:ApplicationHardening"],"url":"https://d3fend.mitre.org/technique/d3f:DeadCodeElimination"},{"id":"D3-FBA","name":"Firmware Behavior Analysis","tactics":["d3f:PlatformMonitoring"],"url":"https://d3fend.mitre.org/technique/d3f:FirmwareBehaviorAnalysis"},{"id":"D3-SU","name":"Software Update","tactics":["d3f:PlatformHardening"],"url":"https://d3fend.mitre.org/technique/d3f:SoftwareUpdate"},{"id":"D3-DST","name":"Decoy Session Token","tactics":["d3f:DecoyObject"],"url":"https://d3fend.mitre.org/technique/d3f:DecoySessionToken"},{"id":"D3-IAA","name":"Identifier Activity Analysis","tactics":["d3f:IdentifierAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:IdentifierActivityAnalysis"},{"id":"D3-DNSAL","name":"DNS Allowlisting","tactics":["d3f:NetworkIsolation"],"url":"https://d3fend.mitre.org/technique/d3f:DNSAllowlisting"},{"id":"D3-IRA","name":"Identifier Reputation Analysis","tactics":["d3f:IdentifierAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:IdentifierReputationAnalysis"},{"id":"D3-PLM","name":"Physical Link Mapping","tactics":["d3f:NetworkMapping"],"url":"https://d3fend.mitre.org/technique/d3f:PhysicalLinkMapping"},{"id":"D3-LAM","name":"Local Account Monitoring","tactics":["d3f:UserBehaviorAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:LocalAccountMonitoring"},{"id":"D3-CTS","name":"Credential Transmission Scoping","tactics":["d3f:CredentialHardening"],"url":"https://d3fend.mitre.org/technique/d3f:CredentialTransmissionScoping"},{"id":"D3-SSC","name":"Shadow Stack Comparisons","tactics":["d3f:ProcessAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:ShadowStackComparisons"},{"id":"D3-SMRA","name":"Sender MTA Reputation Analysis","tactics":["d3f:MessageAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:SenderMTAReputationAnalysis"},{"id":"D3-PSMD","name":"Process Self-Modification Detection","tactics":["d3f:ProcessAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:ProcessSelf-ModificationDetection"},{"id":"D3-NNI","name":"Network Node Inventory","tactics":["d3f:AssetInventory"],"url":"https://d3fend.mitre.org/technique/d3f:NetworkNodeInventory"},{"id":"D3-SRA","name":"Sender Reputation Analysis","tactics":["d3f:MessageAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:SenderReputationAnalysis"},{"id":"D3-ANCI","name":"Authentication Cache Invalidation","tactics":["d3f:CredentialEviction"],"url":"https://d3fend.mitre.org/technique/d3f:AuthenticationCacheInvalidation"},{"id":"D3-PSEP","name":"Process Segment Execution Prevention","tactics":["d3f:ApplicationHardening"],"url":"https://d3fend.mitre.org/technique/d3f:ProcessSegmentExecutionPrevention"},{"id":"D3-UDTA","name":"User Data Transfer Analysis","tactics":["d3f:UserBehaviorAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:UserDataTransferAnalysis"},{"id":"D3-AL","name":"Account Locking","tactics":["d3f:CredentialEviction"],"url":"https://d3fend.mitre.org/technique/d3f:AccountLocking"},{"id":"D3-UA","name":"URL Analysis","tactics":["d3f:IdentifierAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:URLAnalysis"},{"id":"D3-EFA","name":"Emulated File Analysis","tactics":["d3f:FileAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:EmulatedFileAnalysis"},{"id":"D3-FEMC","name":"Firmware Embedded Monitoring Code","tactics":["d3f:PlatformMonitoring"],"url":"https://d3fend.mitre.org/technique/d3f:FirmwareEmbeddedMonitoringCode"},{"id":"D3-CSPP","name":"Client-server Payload Profiling","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:Client-serverPayloadProfiling"},{"id":"D3-BDI","name":"Broadcast Domain Isolation","tactics":["d3f:NetworkIsolation"],"url":"https://d3fend.mitre.org/technique/d3f:BroadcastDomainIsolation"},{"id":"D3-FE","name":"File Encryption","tactics":["d3f:PlatformHardening"],"url":"https://d3fend.mitre.org/technique/d3f:FileEncryption"},{"id":"D3-ISVA","name":"Inbound Session Volume Analysis","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:InboundSessionVolumeAnalysis"},{"id":"D3-RC","name":"Reissue Credential","tactics":["d3f:RestoreObject"],"url":"https://d3fend.mitre.org/technique/d3f:ReissueCredential"},{"id":"D3-AVE","name":"Asset Vulnerability Enumeration","tactics":["d3f:AssetInventory"],"url":"https://d3fend.mitre.org/technique/d3f:AssetVulnerabilityEnumeration"},{"id":"D3-FR","name":"File Removal","tactics":["d3f:FileEviction"],"url":"https://d3fend.mitre.org/technique/d3f:FileRemoval"},{"id":"D3-PT","name":"Process Termination","tactics":["d3f:ProcessEviction"],"url":"https://d3fend.mitre.org/technique/d3f:ProcessTermination"},{"id":"D3-DNSTA","name":"DNS Traffic Analysis","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:DNSTrafficAnalysis"},{"id":"D3-HBPI","name":"Hardware-based Process Isolation","tactics":["d3f:ExecutionIsolation"],"url":"https://d3fend.mitre.org/technique/d3f:Hardware-basedProcessIsolation"},{"id":"D3-RDI","name":"Restore Disk Image","tactics":["d3f:RestoreObject"],"url":"https://d3fend.mitre.org/technique/d3f:RestoreDiskImage"},{"id":"D3-PAN","name":"Pointer Authentication","tactics":["d3f:ApplicationHardening"],"url":"https://d3fend.mitre.org/technique/d3f:PointerAuthentication"},{"id":"D3-BA","name":"Bootloader Authentication","tactics":["d3f:PlatformHardening"],"url":"https://d3fend.mitre.org/technique/d3f:BootloaderAuthentication"},{"id":"D3-PSA","name":"Process Spawn Analysis","tactics":["d3f:ProcessAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:ProcessSpawnAnalysis"},{"id":"D3-SYSDM","name":"System Dependency Mapping","tactics":["d3f:SystemMapping"],"url":"https://d3fend.mitre.org/technique/d3f:SystemDependencyMapping"},{"id":"D3-DUC","name":"Decoy User Credential","tactics":["d3f:DecoyObject"],"url":"https://d3fend.mitre.org/technique/d3f:DecoyUserCredential"}],"sub_techniques":[{"id":"D3-ACA","name":"Active Certificate Analysis","technique":["d3f:CertificateAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:ActiveCertificateAnalysis"},{"id":"D3-ALLM","name":"Active Logical Link Mapping","technique":["d3f:LogicalLinkMapping"],"url":"https://d3fend.mitre.org/technique/d3f:ActiveLogicalLinkMapping"},{"id":"D3-APLM","name":"Active Physical Link Mapping","technique":["d3f:PhysicalLinkMapping"],"url":"https://d3fend.mitre.org/technique/d3f:ActivePhysicalLinkMapping"},{"id":"D3-CA","name":"Certificate Analysis","technique":["d3f:CertificateAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:CertificateAnalysis"},{"id":"D3-DNRA","name":"Domain Name Reputation Analysis","technique":["d3f:IdentifierReputationAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:DomainNameReputationAnalysis"},{"id":"D3-EHB","name":"Endpoint Health Beacon","technique":["d3f:OperatingSystemMonitoring"],"url":"https://d3fend.mitre.org/technique/d3f:EndpointHealthBeacon"},{"id":"D3-ER","name":"Email Removal","technique":["d3f:FileRemoval"],"url":"https://d3fend.mitre.org/technique/d3f:EmailRemoval"},{"id":"D3-FCA","name":"File Creation Analysis","technique":["d3f:SystemCallAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:FileCreationAnalysis"},{"id":"D3-FCR","name":"File Content Rules","technique":["d3f:FileContentAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:FileContentRules"},{"id":"D3-FHRA","name":"File Hash Reputation Analysis","technique":["d3f:IdentifierReputationAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:FileHashReputationAnalysis"},{"id":"D3-FRDDL","name":"Forward Resolution Domain Denylisting","technique":["d3f:DNSDenylisting"],"url":"https://d3fend.mitre.org/technique/d3f:ForwardResolutionDomainDenylisting"},{"id":"D3-FRIDL","name":"Forward Resolution IP Denylisting","technique":["d3f:DNSDenylisting"],"url":"https://d3fend.mitre.org/technique/d3f:ForwardResolutionIPDenylisting"},{"id":"D3-IDA","name":"Input Device Analysis","technique":["d3f:OperatingSystemMonitoring"],"url":"https://d3fend.mitre.org/technique/d3f:InputDeviceAnalysis"},{"id":"D3-IPRA","name":"IP Reputation Analysis","technique":["d3f:IdentifierReputationAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:IPReputationAnalysis"},{"id":"D3-ITF","name":"Inbound Traffic Filtering","technique":["d3f:NetworkTrafficFiltering"],"url":"https://d3fend.mitre.org/technique/d3f:InboundTrafficFiltering"},{"id":"D3-MAC","name":"Mandatory Access Control","technique":["d3f:Kernel-basedProcessIsolation"],"url":"https://d3fend.mitre.org/technique/d3f:MandatoryAccessControl"},{"id":"D3-MBT","name":"Memory Boundary Tracking","technique":["d3f:OperatingSystemMonitoring"],"url":"https://d3fend.mitre.org/technique/d3f:MemoryBoundaryTracking"},{"id":"D3-OTF","name":"Outbound Traffic Filtering","technique":["d3f:NetworkTrafficFiltering"],"url":"https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering"},{"id":"D3-PCA","name":"Passive Certificate Analysis","technique":["d3f:CertificateAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:PassiveCertificateAnalysis"},{"id":"D3-PFV","name":"Peripheral Firmware Verification","technique":["d3f:FirmwareVerification"],"url":"https://d3fend.mitre.org/technique/d3f:PeripheralFirmwareVerification"},{"id":"D3-PLA","name":"Process Lineage Analysis","technique":["d3f:ProcessSpawnAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:ProcessLineageAnalysis"},{"id":"D3-PLLM","name":"Passive Logical Link Mapping","technique":["d3f:LogicalLinkMapping"],"url":"https://d3fend.mitre.org/technique/d3f:PassiveLogicalLinkMapping"},{"id":"D3-PPLM","name":"Passive Physical Link Mapping","technique":["d3f:PhysicalLinkMapping"],"url":"https://d3fend.mitre.org/technique/d3f:PassivePhysicalLinkMapping"},{"id":"D3-RE","name":"Restore Email","technique":["d3f:RestoreFile"],"url":"https://d3fend.mitre.org/technique/d3f:RestoreEmail"},{"id":"D3-RRDD","name":"Reverse Resolution Domain Denylisting","technique":["d3f:DNSDenylisting"],"url":"https://d3fend.mitre.org/technique/d3f:ReverseResolutionDomainDenylisting"},{"id":"D3-RRID","name":"Reverse Resolution IP Denylisting","technique":["d3f:DNSDenylisting"],"url":"https://d3fend.mitre.org/technique/d3f:ReverseResolutionIPDenylisting"},{"id":"D3-SCF","name":"System Call Filtering","technique":["d3f:Kernel-basedProcessIsolation"],"url":"https://d3fend.mitre.org/technique/d3f:SystemCallFiltering"},{"id":"D3-SDM","name":"System Daemon Monitoring","technique":["d3f:OperatingSystemMonitoring"],"url":"https://d3fend.mitre.org/technique/d3f:SystemDaemonMonitoring"},{"id":"D3-SFA","name":"System File Analysis","technique":["d3f:OperatingSystemMonitoring"],"url":"https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis"},{"id":"D3-SFV","name":"System Firmware Verification","technique":["d3f:FirmwareVerification"],"url":"https://d3fend.mitre.org/technique/d3f:SystemFirmwareVerification"},{"id":"D3-SICA","name":"System Init Config Analysis","technique":["d3f:OperatingSystemMonitoring"],"url":"https://d3fend.mitre.org/technique/d3f:SystemInitConfigAnalysis"},{"id":"D3-SJA","name":"Scheduled Job Analysis","technique":["d3f:OperatingSystemMonitoring"],"url":"https://d3fend.mitre.org/technique/d3f:ScheduledJobAnalysis"},{"id":"D3-ULA","name":"Unlock Account","technique":["d3f:RestoreUserAccountAccess"],"url":"https://d3fend.mitre.org/technique/d3f:UnlockAccount"},{"id":"D3-URA","name":"URL Reputation Analysis","technique":["d3f:IdentifierReputationAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:URLReputationAnalysis"},{"id":"D3-USICA","name":"User Session Init Config Analysis","technique":["d3f:OperatingSystemMonitoring"],"url":"https://d3fend.mitre.org/technique/d3f:UserSessionInitConfigAnalysis"}]}});