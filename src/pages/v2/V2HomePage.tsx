import { motion } from "framer-motion";
import { useRole } from "@/contexts/RoleContext";
import HomeHero from "@/components/home/HomeHero";
import HomeStats from "@/components/home/HomeStats";
import HomeQuickActions from "@/components/home/HomeQuickActions";
import HomeBottomSection from "@/components/home/HomeBottomSection";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const V2HomePage = () => {
  const { role } = useRole();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-8 space-y-8"
    >
      <HomeHero role={role} />
      <HomeStats role={role} />
      <HomeQuickActions role={role} />
      <HomeBottomSection role={role} />
    </motion.div>
  );
};

export default V2HomePage;
