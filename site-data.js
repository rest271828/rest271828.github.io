// 公开内容白名单：本文件的每个字段都会被访客看到，包括源码里的注释。
// 不要填写护照、身份证、学号、住址、出生日期、签名或申请系统账号。
window.SITE_DATA = {
  // 可修改：公开头像放在 assets/profile.webp，并加入发布清单；留空则不显示。
  avatar: "",
  // 可修改：沿用已授权公开的邮箱，不额外公开手机号。
  email: "sunqidong152@gmail.com",
  github: "https://github.com/rest271828",
  // 只链接已脱敏、核验过的 Overleaf 公开版 PDF。
  cv: "assets/Qidong-Sun-CV.pdf",
  linkedin: "",

  // 可修改：日期取自本次提供的 CV；不确定的 time 可留空。
  // 中英文应保持对应，预计完成的内容不要改写成已完成。
  en: {
    name: "Qidong Sun",
    chineseName: "",
    siteLabel: "Chongqing University · Robotics Engineering",
    profile: { role: "Robotics Engineering Undergraduate", school: "Chongqing University", visit: "Research Assistant at SUTD · CSC-funded visit" },
    subtitle: "Robot Learning · Embodied AI · Quadruped Locomotion",
    summary: "I am a final-year undergraduate in Robotics Engineering at Chongqing University’s Elite Institute of Engineering. My work spans vision-language-action models, memory for long-horizon robot tasks, and reinforcement learning for quadruped locomotion.",
    about: "I study in the Mingyue Sci-Tech Innovation Class at Chongqing University. Since June 2026, I have worked as a Research Assistant (RA) under Asst. Prof. Yihan Du at Singapore University of Technology and Design (SUTD), initially remotely. During my CSC-funded visit, I am working on Unitree Go2 locomotion and parkour learning with Asst. Prof. Du and Dr. Shen Chen.",
    nav: { about: "About", education: "Education", research: "Research", projects: "Projects", patents: "Patent", awards: "Awards", contact: "Contact" },
    buttons: { github: "GitHub", email: "Email", cv: "CV (PDF)", projects: "Projects" },
    sections: { about: "About", education: "Education", interests: "Research Interests", research: "Research Experience", projects: "Selected Projects", patents: "Patent", skills: "Technical Skills", certificates: "Languages", awards: "Honors & Activities", contact: "Contact" },
    education: [
      {
        school: "Singapore University of Technology and Design",
        location: "Singapore",
        degree: "Visiting Student · Research Assistant (RA)",
        detail: "Quadruped locomotion and parkour learning · Asst. Prof. Yihan Du & Dr. Shen Chen",
        note: "Fully funded by the China Scholarship Council (CSC)",
        time: "Sept. 2026 – Dec. 2026",
        logo: "assets/logos/sutd.png"
      },
      {
        school: "Chongqing University",
        location: "Chongqing, China",
        degree: "B.Eng. in Robotics Engineering · Expected June 2027",
        detail: "ELITE INSTITUTE OF ENGINEERING · Mingyue Sci-Tech Innovation Class",
        note: "GPA: 3.51/4.00 · Weighted average: 86.00/100",
        time: "Sept. 2023 – June 2027",
        logo: "assets/logos/cqu-seal.png"
      }
    ],
    interests: ["Vision-Language-Action Models", "Long-Horizon Robot Learning", "Reinforcement Learning", "Quadruped Locomotion", "Embodied AI", "Simulation & Transfer"],
    research: [
      {
        title: "Long-Horizon Memory for VLA Systems",
        affiliation: "Remote research internship · Shanghai Jiao Tong University · Prof. Zhipeng Zhang",
        time: "Apr. 2026 – Sept. 2026",
        description: "Investigated persistent task-state memory using retrieval-based, discrete, frozen-VLM history-conditioning, and recurrent GRU approaches.",
        highlights: ["Designed current-only, fixed-history, zero-memory, and shuffled-history controls to evaluate memory use.", "A recurrent-memory experiment reduced validation Action L1 from 0.143 to 0.095. Ablations also exposed elapsed-time shortcuts and weak transition recognition, limiting claims about robust task-state understanding."],
        tech: ["VLA", "GRU", "Memory", "Controlled Ablations"]
      },
      {
        title: "VLA-Based Dual-Arm Simulation and Data Pipeline",
        affiliation: "Embodied Intelligence Lab · Chongqing University",
        time: "Sept. 2025 – Mar. 2026",
        description: "Built an NVIDIA Isaac Sim pipeline to collect RGB observations, language instructions, and proprioceptive joint states for dual-arm manipulation.",
        highlights: ["Implemented a WebSocket client for observation–action communication with a pi-0 policy server.", "Converted simulation episodes to LeRobot-style Parquet datasets and validated joint alignment, action–observation consistency, and trajectory logs."],
        tech: ["Isaac Sim", "pi-0 / OpenPI", "LeRobot", "WebSocket", "Parquet"]
      }
    ],
    projects: [
      {
        title: "Unitree Go2 Locomotion and Parkour Learning",
        time: "June 2026 – Present",
        description: "Adapted Isaac Gym parkour pipelines for Unitree Go2, including PPO locomotion, privileged teacher policies, and teacher–student learning. Trained walking and parkour-field teacher policies, analyzed obstacle-traversal failures, and migrated an Extreme Parkour pipeline from A1 to Go2. Visual-policy distillation and deployment experiments are subsequent work.",
        tech: ["Unitree Go2", "Isaac Gym", "PPO", "Teacher–Student Learning"],
        // 可修改：无真实项目图片时留空，不使用其他机器人的配图。
        image: "",
        links: []
      },
      {
        title: "Isaac Sim Dual-Arm OpenPI Client",
        time: "Sept. 2025 – Mar. 2026",
        description: "An implementation of multimodal demonstration collection, joint mapping, and LeRobot dataset conversion. The public repository includes collection and policy-client demos; its README notes an unresolved action-execution issue, so this is not presented as a completed manipulation policy.",
        tech: ["Python", "Isaac Sim", "OpenPI", "LeRobot"],
        image: "",
        imageAlt: "Data collection in the Isaac Sim dual-arm environment",
        links: [{ label: "Code & demo", url: "https://github.com/rest271828/lerobot_data_convert_test_isaacsim" }]
      },
      {
        title: "RoboMaster Decision Stack Refactor",
        time: "July 2024 – May 2025",
        description: "Refactored the ROS 2 / C++ autonomy stack into state-estimation, decision-making, and action-execution layers. Co-designed interfaces with the electrical-control team, tested navigation in Gazebo, and debugged command and feedback integration on the robot.",
        tech: ["ROS 2", "C++", "Gazebo", "System Integration"],
        image: "",
        links: [{ label: "Code", url: "https://github.com/rest271828/rm_decision_2025_pb" }]
      }
    ],
    patents: [{ title: "Drive-Steering Wheel", time: "Granted Sept. 2026", description: "Chinese utility model patent · Co-inventor · Publication No. CN 224702860 U" }],
    skills: [
      { title: "Programming", items: ["Python", "C++", "MATLAB"] },
      { title: "Robot Learning", items: ["PyTorch", "PPO", "VLA Pipelines", "LeRobot", "Experiment Analysis"] },
      { title: "Robotics & Simulation", items: ["ROS 2", "Isaac Sim", "Isaac Gym", "Gazebo", "MuJoCo", "Nav2", "SLAM Toolbox", "RViz2"] },
      { title: "Engineering Tools", items: ["Linux / Ubuntu", "Git", "CMake", "WebSocket"] }
    ],
    certificates: ["IELTS Academic: Overall 6.5; all sub-scores ≥ 6.0"],
    // 可修改：只展示奖项名称，不上传带证书编号、签名或二维码的原件。
    awards: [
      { time: "2026", title: "CSC Fully Funded Visiting Scholarship · SUTD" },
      { time: "2025", title: "National Third Prize · RoboMaster National Final" },
      { time: "2025", title: "Regional Second Prize · RoboMaster Central China Regional" },
      { time: "2025", title: "Regional Third Prize · RoboMaster University League, Southwest Station" },
      { time: "2026", title: "Successful Participant · Mathematical / Interdisciplinary Contest in Modeling" },
      { time: "2026", title: "Participant · 4th IOTSC Summer Camp, University of Macau" }
    ],
    contact: "For research discussions or collaboration related to robot learning, embodied AI, and quadruped locomotion, please reach me by email.",
    updated: "Updated November 2026",
    cvTitle: "Curriculum Vitae", back: "Homepage", print: "Print / Save PDF"
  },

  // 可修改：中文内容与上方英文内容对应，公开版简历也使用本文件。
  zh: {
    name: "孙奇栋",
    chineseName: "Qidong Sun",
    siteLabel: "重庆大学 · 机器人工程",
    profile: { role: "机器人工程本科生", school: "重庆大学", visit: "SUTD 研究助理（RA）· CSC 资助访问" },
    subtitle: "机器人学习 · 具身智能 · 四足机器人运动控制",
    summary: "我是重庆大学国家卓越工程师学院机器人工程专业大四本科生，主要关注视觉—语言—动作模型（VLA）、长时序机器人任务中的记忆机制，以及四足机器人强化学习运动控制。",
    about: "我就读于重庆大学明月科创班（机器人工程）。自 2026 年 6 月起，我在新加坡科技设计大学（SUTD）的 Asst. Prof. Yihan Du 指导下担任研究助理（RA），最初以远程方式参与。在国家留学基金管理委员会（CSC）资助的访问期间，我与 Asst. Prof. Yihan Du 和 Dr. Shen Chen 开展 Unitree Go2 运动控制与跑酷学习相关研究。",
    nav: { about: "关于", education: "教育", research: "研究", projects: "项目", patents: "专利", awards: "荣誉", contact: "联系" },
    buttons: { github: "GitHub", email: "邮箱", cv: "简历（PDF）", projects: "项目" },
    sections: { about: "关于我", education: "教育与访问经历", interests: "研究兴趣", research: "研究经历", projects: "代表项目", patents: "专利", skills: "技术能力", certificates: "语言能力", awards: "荣誉与活动", contact: "联系" },
    education: [
      { school: "新加坡科技设计大学（SUTD）", location: "新加坡", degree: "访问学生 · 研究助理（RA）", detail: "四足机器人运动控制与跑酷学习 · Asst. Prof. Yihan Du、Dr. Shen Chen", note: "中国国家留学基金管理委员会（CSC）全额资助", time: "2026.09 – 2026.12", logo: "assets/logos/sutd.png" },
      { school: "重庆大学", location: "中国重庆", degree: "机器人工程本科 · 预计 2027 年 6 月毕业", detail: "国家卓越工程师学院（ELITE INSTITUTE OF ENGINEERING）· 明月科创班", note: "GPA：3.51/4.00 · 加权平均分：86.00/100", time: "2023.09 – 2027.06", logo: "assets/logos/cqu-seal.png" }
    ],
    interests: ["视觉—语言—动作模型", "长时序机器人学习", "强化学习", "四足机器人运动控制", "具身智能", "仿真与迁移"],
    research: [
      { title: "VLA 系统的长时序记忆机制", affiliation: "远程科研实习 · 上海交通大学 · Prof. Zhipeng Zhang", time: "2026.04 – 2026.09", description: "围绕持久化任务状态记忆，探索检索式记忆、离散记忆、冻结 VLM 的历史条件建模与 GRU 循环记忆等方法。", highlights: ["设置仅当前观测、固定历史、记忆清零和记忆打乱等对照，检验策略是否真正利用历史。", "在一次循环记忆实验中，验证集 Action L1 从 0.143 降至 0.095；消融也发现时间捷径和较弱的状态切换识别能力，因此不将结果表述为已实现稳健的任务状态理解。"], tech: ["VLA", "GRU", "任务记忆", "对照与消融"] },
      { title: "基于 VLA 的双臂仿真与数据流程", affiliation: "重庆大学具身智能实验室", time: "2025.09 – 2026.03", description: "在 NVIDIA Isaac Sim 中搭建双臂操作仿真流程，采集 RGB 观测、语言指令与本体关节状态。", highlights: ["实现连接 pi-0 策略服务器的 WebSocket 客户端，组织观测与动作通信。", "将仿真 episode 转换为 LeRobot 风格的 Parquet 数据集，并检查关节对齐、动作—观测一致性及轨迹日志。"], tech: ["Isaac Sim", "pi-0 / OpenPI", "LeRobot", "WebSocket", "Parquet"] }
    ],
    projects: [
      { title: "Unitree Go2 运动控制与跑酷学习", time: "2026.06 – 至今", description: "复现并适配基于 Isaac Gym 的 Unitree Go2 跑酷训练流程，涉及 PPO 运动控制、特权信息教师策略及教师—学生学习。训练行走与跑酷场地教师策略，分析障碍穿越行为和失败案例，并将 Extreme Parkour 流程由 A1 迁移至 Go2。视觉策略蒸馏与部署实验属于后续工作。", tech: ["Unitree Go2", "Isaac Gym", "PPO", "教师—学生学习"], image: "", links: [] },
      { title: "Isaac Sim 双臂 OpenPI 客户端", time: "2025.09 – 2026.03", description: "实现多模态演示采集、关节映射与 LeRobot 数据转换。公开仓库提供数据采集和策略客户端演示；README 同时注明动作执行链路仍有待修复的问题，因此不将其描述为已完成的操作策略。", tech: ["Python", "Isaac Sim", "OpenPI", "LeRobot"], image: "", imageAlt: "Isaac Sim 双臂环境中的数据采集演示", links: [{ label: "代码与演示", url: "https://github.com/rest271828/lerobot_data_convert_test_isaacsim" }] },
      { title: "RoboMaster 决策系统重构", time: "2024.07 – 2025.05", description: "将 ROS 2 / C++ 自主决策系统拆分为状态估计、决策与动作执行层。与电控组共同设计通信接口，在 Gazebo 中测试导航模块，并在实机上联调控制指令、执行反馈与通信稳定性。", tech: ["ROS 2", "C++", "Gazebo", "系统集成"], image: "", links: [{ label: "代码", url: "https://github.com/rest271828/rm_decision_2025_pb" }] }
    ],
    patents: [{ title: "驱动转向轮（Drive-Steering Wheel）", time: "2026.09 授权", description: "中国实用新型专利 · 共同发明人 · 公告号 CN 224702860 U" }],
    skills: [
      { title: "编程语言", items: ["Python", "C++", "MATLAB"] },
      { title: "机器人学习", items: ["PyTorch", "PPO", "VLA 流程", "LeRobot", "实验分析"] },
      { title: "机器人与仿真", items: ["ROS 2", "Isaac Sim", "Isaac Gym", "Gazebo", "MuJoCo", "Nav2", "SLAM Toolbox", "RViz2"] },
      { title: "工程工具", items: ["Linux / Ubuntu", "Git", "CMake", "WebSocket"] }
    ],
    certificates: ["雅思 Academic：总分 6.5，各单项 ≥ 6.0"],
    awards: [
      { time: "2026", title: "CSC 全额资助访问奖学金 · SUTD" },
      { time: "2025", title: "RoboMaster 全国总决赛三等奖" },
      { time: "2025", title: "RoboMaster 中部区域赛二等奖" },
      { time: "2025", title: "RoboMaster 高校联盟赛西南站三等奖" },
      { time: "2026", title: "美国大学生数学建模竞赛（MCM / ICM）Successful Participant" },
      { time: "2026", title: "澳门大学第四届 IOTSC 优秀大学生夏令营参与者" }
    ],
    contact: "欢迎通过邮箱交流机器人学习、具身智能与四足机器人运动控制相关研究和合作。",
    updated: "更新于 2026 年 11 月",
    cvTitle: "个人简历", back: "返回主页", print: "打印 / 保存 PDF"
  }
};
