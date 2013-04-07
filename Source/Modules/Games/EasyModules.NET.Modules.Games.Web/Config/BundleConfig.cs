using System.Web.Optimization;

namespace EasyModules.NET.Modules.Games.Web.Config
{
    public class BundleConfig
    {
        public static void RegisterModuleBundles(BundleCollection bundles)
        {
            //Script files for Ragnarok Game - Note that the order in which they are loaded is important
            bundles.Add(new ScriptBundle("~/bundles/ragnarok").Include(
                // melonJS framework
                        "~/Ragnarok/Scripts/Extensions/melonJS-0.9.5.js"
                        , "~/Ragnarok/Scripts/Extensions/astar.js"
                        , "~/Ragnarok/Scripts/Extensions/graph.js"
                // Game initializer and main game logic
                        , "~/Ragnarok/Scripts/Core/Main.js"
                // Resources
                        , "~/Ragnarok/Scripts/Core/Resources.js"
                        , "~/Ragnarok/Scripts/Core/Animations.js"
                        , "~/Ragnarok/Scripts/Core/Dialogs.js"
                // Entities
                        , "~/Ragnarok/Scripts/Entities/Player.js"
                        , "~/Ragnarok/Scripts/Entities/HUD.js"
                        , "~/Ragnarok/Scripts/Entities/Gold.js"
                        , "~/Ragnarok/Scripts/Entities/NPCs.js"
                // Screens
                        , "~/Ragnarok/Scripts/Core/Screens.js"
                        ));
        }
    }
}