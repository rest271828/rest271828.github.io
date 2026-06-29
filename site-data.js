window.SITE_DATA = {
  // =============================
  // 可修改区域：全站共用信息
  // =============================
  // 如果要添加个人照片，建议放到 images/profile.jpg，然后把 avatar 改成 "images/profile.jpg"。
  // 如果保持空字符串，页面会显示姓名首字母占位。
  avatar: "",

  // 可修改区域：公开联系方式，会显示在首页按钮和 Contact 部分。
  email: "sunqidong152@gmail.com",
  github: "https://github.com/rest271828",

  // 可修改区域：CV 文件路径。发布网站时 files/cv.pdf 会一起上传。
  cv: "files/cv.pdf",
  linkedin: "#",

  // 可修改区域：所有和时间有关的信息目前都故意留成占位。
  // 之后可以改成具体时间，例如："2023 至今"、"2025" 或 "2026.06 - 2026.08"。
  timePlaceholder: {
    en: "Time: To be updated",
    zh: "时间：待补充"
  },

  // =============================
  // 可修改区域：英文内容
  // =============================
  // 之后大多数英文内容都在这里改：首页介绍、关于我、项目、经历、技能、证书、奖项和联系方式。
  en: {
    name: "Qidong Sun",
    chineseName: "Sun Qidong",
    siteLabel: "Academic / Engineering Portfolio",
    subtitle: "Undergraduate Robotics Student | Robot Learning | Reinforcement Learning | Quadruped Locomotion",
    summary:
      "I am an undergraduate robotics engineering student at Chongqing University, interested in reinforcement learning, robot learning, embodied AI, and quadruped locomotion. I am currently focusing on RL-based locomotion control for quadruped robots, especially Unitree Go2 simulation, training, validation, and deployment workflows.",
    about:
      "I study Robotics Engineering in the Mingyue Sci-Tech Innovation Class at the National Excellent Engineer College, Chongqing University. My current work and learning focus on reinforcement learning for quadruped locomotion, including Isaac Lab / RobotLab simulation environments, RSL-RL PPO training, sim-to-sim validation, and policy deployment. I am also interested in how reinforcement learning, Meta-RL, imitation learning, and embodied intelligence can improve robot motion capability, adaptability, and robustness.",
    nav: {
      about: "About",
      interests: "Interests",
      projects: "Projects",
      experience: "Experience",
      skills: "Skills",
      certificates: "Certificates",
      awards: "Awards",
      contact: "Contact"
    },
    buttons: {
      github: "GitHub",
      email: "Email",
      cv: "CV",
      projects: "Projects"
    },
    sections: {
      about: "About",
      interests: "Research Interests",
      projects: "Selected Projects",
      experience: "Experience",
      skills: "Skills",
      certificates: "Languages & Certificates",
      awards: "Awards",
      contact: "Contact"
    },
    education: [
      {
        school: "Singapore University of Technology and Design, Singapore",
        degree: "Incoming Visiting Research Student",
        detail: "Reinforcement Learning, Locomotion Control, and Simulation Deployment for Quadruped Robots",
        note: "CSC funding",
        time: "Time: To be updated",
        logo: "assets/logos/sutd.png"
      },
      {
        school: "Chongqing University, Chongqing, China",
        degree: "B.Eng. Undergraduate Student in Robotics Engineering",
        detail: "National Excellent Engineer College / Mingyue Sci-Tech Innovation Class",
        note: "GPA: Pending official update",
        time: "Time: To be updated",
        logo: "assets/logos/cqu.png",
        secondaryLogo: "assets/logos/eie.svg"
      }
    ],
    interests: [
      "Reinforcement Learning",
      "Quadruped Locomotion",
      "Embodied AI",
      "Robot Learning",
      "Imitation Learning",
      "Sim-to-Real / Sim-to-Sim",
      "VLA / VLM for Robotics",
      "ROS2 Robot Systems",
      "Motion Planning and Control",
      "Autonomous Robot Systems"
    ],
    projects: [
      {
        title: "RL-based Quadruped Locomotion Control",
        time: "Time: To be updated",
        description:
          "Training locomotion policies for Unitree Go2 with Isaac Lab / RobotLab and RSL-RL PPO. The project includes velocity-tracking policy training, reward curve analysis, reward term tuning, policy export, and sim-to-sim deployment tests in Gazebo.",
        tech: ["Unitree Go2", "Isaac Lab", "RobotLab", "RSL-RL", "PPO", "Gazebo"],
        image: "media/lekiwi/kiwi.webp",
        links: [
          { label: "Code", url: "#" },
          { label: "Notes", url: "#" }
        ]
      },
      {
        title: "ROS2 Planning and Control Prototype",
        time: "Time: To be updated",
        description:
          "A ROS2-based planning and control course project for autonomous driving / mobile robot planning. It includes custom messages, planning modules, map service, global path service, planning pipeline configuration, RViz visualization, and a basic OSQP optimization example for trajectory planning.",
        tech: ["ROS2 Humble", "RViz2", "ros2_control", "OSQP", "C++", "Python"],
        image: "media/so100/leader_follower.webp",
        links: [{ label: "Code", url: "#" }]
      },
      {
        title: "SO-101 Robotic Arm Simulation and Learning Exploration",
        time: "Time: To be updated",
        description:
          "Simulation and hardware-oriented exploration with the SO-101 6-DoF robotic arm, including MuJoCo environments, rule-based control baselines, teleoperation data collection, and future data workflows for imitation learning / ACT-style methods.",
        tech: ["SO-101", "MuJoCo", "Teleoperation", "Imitation Learning", "Robot Learning"],
        image: "media/so101/so101.webp",
        links: [{ label: "Code", url: "#" }]
      },
      {
        title: "RoboMaster Robot Competition",
        time: "Time: To be updated",
        description:
          "Engineering experience in RoboMaster robot competition, involving robot control, electromechanical-software integration, debugging, and team-based development. This experience helped me build practical system integration and field debugging skills.",
        tech: ["RoboMaster", "Robot Control", "Embedded Systems", "System Integration"],
        image: "media/hope_jr/hopejr.png",
        links: [{ label: "Details", url: "#" }]
      }
    ],
    experience: [
      {
        title: "Embodied Intelligence Lab, Chongqing University",
        time: "Time: To be updated",
        description: "Learning and working on robot learning, simulation, and reinforcement learning workflows for robotics systems."
      },
      {
        title: "Incoming Visiting Research Student, SUTD",
        time: "Time: To be updated",
        description:
          "Preparing to join a visiting research project at Singapore University of Technology and Design under Prof. Yihan Du, focusing on reinforcement learning, locomotion control, and simulation deployment for quadruped robots."
      },
      {
        title: "RoboMaster Team Experience",
        time: "Time: To be updated",
        description: "Participated in RoboMaster robot competition and gained engineering experience in robot control, system integration, debugging, and collaborative development."
      }
    ],
    skills: [
      { title: "Programming", items: ["C++", "Python", "MATLAB"] },
      { title: "Robotics", items: ["ROS2 Humble", "RViz2", "ros2_control", "colcon", "Motion Planning", "Robot Control"] },
      { title: "Simulation", items: ["Gazebo", "Isaac Sim", "Isaac Lab", "RobotLab", "MuJoCo"] },
      { title: "Machine Learning / RL", items: ["PPO", "RSL-RL", "Reward Design", "Policy Training", "Imitation Learning Basics", "Experiment Log Analysis"] },
      { title: "Tools", items: ["Git / GitHub", "Linux / Ubuntu", "VS Code / Cursor", "Conda", "LaTeX / Overleaf"] }
    ],
    certificates: ["IELTS Overall 6.5, with all sub-scores >= 6.0", "Additional certificates: To be updated"],
    awards: [
      { time: "Time: To be updated", title: "RoboMaster National Competition, Third Prize" },
      { time: "Time: To be updated", title: "RoboMaster Regional Competition, Second Prize" },
      { time: "Time: To be updated", title: "RoboMaster Regional Competition, Third Prize" },
      { time: "Time: To be updated", title: "Mathematical Contest in Modeling, Successful Participant" }
    ],
    contact: "I am open to discussions about robotics, reinforcement learning, quadruped locomotion, embodied AI, and undergraduate research opportunities.",
    updated: "Last updated: To be updated"
  },

  // =============================
  // 可修改区域：中文内容
  // =============================
  // 更新内容时，建议让这里和上面的英文内容保持对应。
  zh: {
    name: "孙奇栋",
    chineseName: "Qidong Sun",
    siteLabel: "个人学术 / 工程主页",
    subtitle: "机器人工程本科生 | 机器人学习 | 强化学习 | 四足机器人运动控制",
    summary:
      "我是重庆大学机器人工程本科生，兴趣方向包括强化学习、机器人学习、具身智能和四足机器人运动控制。目前主要关注基于强化学习的四足机器人运动控制，尤其是 Unitree Go2 的仿真、训练、验证与部署流程。",
    about:
      "我就读于重庆大学国家卓越工程师学院 / 明月科创班（机器人工程）。当前学习和研究重点包括四足机器人强化学习运动控制、Isaac Lab / RobotLab 仿真环境、RSL-RL PPO 训练、sim-to-sim 验证和策略部署。我也关注强化学习、Meta-RL、模仿学习和具身智能如何提升机器人的运动能力、适应能力与鲁棒性。",
    nav: {
      about: "关于",
      interests: "方向",
      projects: "项目",
      experience: "经历",
      skills: "技能",
      certificates: "证书",
      awards: "奖项",
      contact: "联系"
    },
    buttons: {
      github: "GitHub",
      email: "邮箱",
      cv: "简历",
      projects: "项目"
    },
    sections: {
      about: "关于我",
      interests: "研究 / 工程兴趣",
      projects: "代表项目",
      experience: "经历",
      skills: "技术能力",
      certificates: "语言与证书",
      awards: "奖项",
      contact: "联系"
    },
    education: [
      {
        school: "新加坡科技设计大学（SUTD），新加坡",
        degree: "即将参与访问研究",
        detail: "四足机器人强化学习、运动控制与仿真部署",
        note: "CSC funding",
        time: "时间：待补充",
        logo: "assets/logos/sutd.png"
      },
      {
        school: "重庆大学，中国重庆",
        degree: "机器人工程本科生",
        detail: "国家卓越工程师学院 / 明月科创班（机器人工程）",
        note: "GPA：待官方更新",
        time: "时间：待补充",
        logo: "assets/logos/cqu.png",
        secondaryLogo: "assets/logos/eie.svg"
      }
    ],
    interests: ["机器人强化学习", "四足机器人运动控制", "具身智能", "机器人学习", "模仿学习", "Sim-to-Real / Sim-to-Sim", "VLA / VLM for Robotics", "ROS2 机器人系统", "运动规划与控制", "自主机器人系统"],
    projects: [
      {
        title: "基于强化学习的四足机器人运动控制",
        time: "时间：待补充",
        description: "使用 Isaac Lab / RobotLab 和 RSL-RL PPO 对 Unitree Go2 进行运动控制策略训练。项目内容包括速度跟踪策略训练、reward 曲线分析、部分 reward 项调整、策略导出，以及在 Gazebo 中进行 sim-to-sim 部署测试。",
        tech: ["Unitree Go2", "Isaac Lab", "RobotLab", "RSL-RL", "PPO", "Gazebo"],
        image: "media/lekiwi/kiwi.webp",
        links: [{ label: "代码", url: "#" }, { label: "笔记", url: "#" }]
      },
      {
        title: "基于 ROS2 的规划与控制原型系统",
        time: "时间：待补充",
        description: "基于 ROS2 的规划与控制课程项目，方向类似自动驾驶 / 移动机器人规划系统。项目包含自定义消息、规划模块、地图服务、全局路径服务、规划流程配置、RViz 可视化，以及一个用于轨迹规划相关问题的基础 OSQP 优化示例。",
        tech: ["ROS2 Humble", "RViz2", "ros2_control", "OSQP", "C++", "Python"],
        image: "media/so100/leader_follower.webp",
        links: [{ label: "代码", url: "#" }]
      },
      {
        title: "SO-101 机械臂仿真与学习探索",
        time: "时间：待补充",
        description: "使用 SO-101 六自由度机械臂进行仿真和实物相关探索，包括 MuJoCo 机械臂环境、规则控制 baseline、遥操作数据采集，以及后续可能用于模仿学习 / ACT 类方法的数据流程。",
        tech: ["SO-101", "MuJoCo", "遥操作", "模仿学习", "机器人学习"],
        image: "media/so101/so101.webp",
        links: [{ label: "代码", url: "#" }]
      },
      {
        title: "RoboMaster 机器人竞赛",
        time: "时间：待补充",
        description: "参加 RoboMaster 机器人竞赛，积累了机器人控制、机电软系统集成、调试和团队工程开发经验，并获得过国家级和区域级奖项。",
        tech: ["RoboMaster", "机器人控制", "嵌入式系统", "系统集成"],
        image: "media/hope_jr/hopejr.png",
        links: [{ label: "详情", url: "#" }]
      }
    ],
    experience: [
      { title: "重庆大学具身智能实验室", time: "时间：待补充", description: "学习和参与机器人学习、仿真环境、强化学习训练流程等机器人系统相关工作。" },
      { title: "即将参与 SUTD 访问研究", time: "时间：待补充", description: "正在准备前往新加坡科技设计大学参与访问研究项目，导师为 Prof. Yihan Du，方向与四足机器人的强化学习、运动控制和仿真部署相关。" },
      { title: "RoboMaster 团队经历", time: "时间：待补充", description: "参与 RoboMaster 机器人竞赛，积累机器人控制、系统集成、调试和团队协作开发经验。" }
    ],
    skills: [
      { title: "编程语言", items: ["C++", "Python", "MATLAB"] },
      { title: "机器人", items: ["ROS2 Humble", "RViz2", "ros2_control", "colcon", "运动规划", "机器人控制"] },
      { title: "仿真", items: ["Gazebo", "Isaac Sim", "Isaac Lab", "RobotLab", "MuJoCo"] },
      { title: "机器学习 / 强化学习", items: ["PPO", "RSL-RL", "奖励函数设计", "策略训练", "模仿学习基础", "实验日志分析"] },
      { title: "工具", items: ["Git / GitHub", "Linux / Ubuntu", "VS Code / Cursor", "Conda", "LaTeX / Overleaf"] }
    ],
    certificates: ["雅思 IELTS 6.5（各单项 >= 6.0）", "其他证书：待补充"],
    awards: [
      { time: "时间：待补充", title: "RoboMaster 全国赛三等奖" },
      { time: "时间：待补充", title: "RoboMaster 区域赛二等奖" },
      { time: "时间：待补充", title: "RoboMaster 区域赛三等奖" },
      { time: "时间：待补充", title: "美国大学生数学建模竞赛 Successful Participant" }
    ],
    contact: "欢迎交流机器人、强化学习、四足机器人运动控制、具身智能和本科科研相关话题。",
    updated: "最近更新：待补充"
  }
};
