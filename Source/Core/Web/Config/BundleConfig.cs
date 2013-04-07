using System;
using System.IO;
using System.Reflection;
using System.Web.Optimization;
using BundleTransformer.Core.Orderers;
using BundleTransformer.Core.Transformers;

namespace EasyModules.NET.Core.Web.Config
{
    /// <summary>
    /// Class for controlling the bundles with javascript and css that needs to be loaded
    /// </summary>
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        /// <summary>
        /// Registers the bundles.
        /// </summary>
        /// <param name="bundles">The bundles.</param>
        public static void RegisterBundles(BundleCollection bundles)
        {
            var cssTransformer = new CssTransformer();
            var jsTransformer = new JsTransformer();
            var nullOrderer = new NullOrderer();

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/Libraries/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/Libraries/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/Libraries/jquery.unobtrusive*",
                        "~/Scripts/Libraries/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/ko").Include(
                        "~/Scripts/Libraries/knockout-2.2.1.js"));

            bundles.Add(new ScriptBundle("~/bundles/global").Include(
            "~/Scripts/Core/global.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquerymousewheel").Include(
                        "~/Scripts/Libraries/jquery.mousewheel.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/Libraries/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/metrojs").Include(
                        "~/Scripts/Libraries/metrojs.js"));

            var less = new Bundle("~/bundles/less").Include("~/Styles/less/bootstrap.less");
            less.Transforms.Add(cssTransformer);
            //less.Transforms.Add(new CssMinify());
            less.Orderer = nullOrderer;
            bundles.Add(less);

            bundles.Add(new StyleBundle("~/bundles/css").Include(
                        "~/Styles/css/jquery.ui.core.css",
                        "~/Styles/css/jquery.ui.resizable.css",
                        "~/Styles/css/jquery.ui.selectable.css",
                        "~/Styles/css/jquery.ui.accordion.css",
                        "~/Styles/css/jquery.ui.autocomplete.css",
                        "~/Styles/css/jquery.ui.button.css",
                        "~/Styles/css/jquery.ui.dialog.css",
                        "~/Styles/css/jquery.ui.slider.css",
                        "~/Styles/css/jquery.ui.tabs.css",
                        "~/Styles/css/jquery.ui.datepicker.css",
                        "~/Styles/css/jquery.ui.progressbar.css",
                        "~/Styles/css/jquery.ui.theme.css"));

            var fullModulePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "bin");
            foreach (var file in Directory.EnumerateFiles(fullModulePath, "EasyModules.NET.Modules.*Web.dll"))
            {
                var assembly = Assembly.LoadFile(file);
                var module = assembly.GetName().Name;
                bundles.Add(new ScriptBundle("~/bundles/" + module + "/js").Include("~/Modules/" + module + "/Scripts/Module/*.js"));
            }

            //TODO: need to finde better method so that modules may inject script and stylebundles
            //Script files for Ragnarok Game - Note that the order in which they are loaded is important
            bundles.Add(new ScriptBundle("~/bundles/ragnarok").Include(
                // melonJS framework
                        "~/Modules/EasyModules.NET.Modules.Games.Web/Ragnarok/Scripts/Extensions/melonJS-0.9.6.js"
                        , "~/Modules/EasyModules.NET.Modules.Games.Web/Ragnarok/Scripts/Extensions/astar.js"
                        , "~/Modules/EasyModules.NET.Modules.Games.Web/Ragnarok/Scripts/Extensions/graph.js"
                // Game initializer and main game logic
                        , "~/Modules/EasyModules.NET.Modules.Games.Web/Ragnarok/Scripts/Core/Main.js"
                // Resources
                        , "~/Modules/EasyModules.NET.Modules.Games.Web/Ragnarok/Scripts/Core/Resources.js"
                        , "~/Modules/EasyModules.NET.Modules.Games.Web/Ragnarok/Scripts/Core/Animations.js"
                        , "~/Modules/EasyModules.NET.Modules.Games.Web/Ragnarok/Scripts/Core/Dialogs.js"
                // Entities
                        , "~/Modules/EasyModules.NET.Modules.Games.Web/Ragnarok/Scripts/Entities/Player.js"
                        , "~/Modules/EasyModules.NET.Modules.Games.Web/Ragnarok/Scripts/Entities/HUD.js"
                        , "~/Modules/EasyModules.NET.Modules.Games.Web/Ragnarok/Scripts/Entities/Gold.js"
                        , "~/Modules/EasyModules.NET.Modules.Games.Web/Ragnarok/Scripts/Entities/NPCs.js"
                // Screens
                        , "~/Modules/EasyModules.NET.Modules.Games.Web/Ragnarok/Scripts/Core/Screens.js"
                        ));

            //allows you to force the optimizations to render as they would in release mode
            BundleTable.EnableOptimizations = true;
        }
    }
}