using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Web.Mvc;

namespace EasyModules.NET.Core.Web.Engines
{
    public class ViewEngine : RazorViewEngine
    {
        public ViewEngine()
        {
            AreaMasterLocationFormats = new[]
            {
                "~/Modules/{2}/Views/{1}/{0}.cshtml",
                "~/Modules/{2}/Views/{1}/{0}.vbhtml",
                "~/Modules/{2}/Views/Shared/{0}.cshtml",
                "~/Modules/{2}/Views/Shared/{0}.vbhtml"
            };

            AreaPartialViewLocationFormats = new[]
            {
                "~/Modules/{2}/Views/{1}/{0}.cshtml",
                "~/Modules/{2}/Views/{1}/{0}.vbhtml",
                "~/Modules/{2}/Views/Shared/{0}.cshtml",
                "~/Modules/{2}/Views/Shared/{0}.vbhtml"
            };

            var areaViewAndPartialViewLocationFormats = new List<string>
            {
                "~/Modules/{2}/Views/{1}/{0}.cshtml",
                "~/Modules/{2}/Views/{1}/{0}.vbhtml",
                "~/Modules/{2}/Views/Shared/{0}.cshtml",
                "~/Modules/{2}/Views/Shared/{0}.vbhtml"
            };

            var partialViewLocationFormats = new List<string>
            {
                "~/Views/{1}/{0}.cshtml",
                "~/Views/{1}/{0}.vbhtml",
                "~/Views/Shared/{0}.cshtml",
                "~/Views/Shared/{0}.vbhtml"
            };

            var masterLocationFormats = new List<string>
            {
                "~/Views/{1}/{0}.cshtml",
                "~/Views/{1}/{0}.vbhtml",
                "~/Views/Shared/{0}.cshtml",
                "~/Views/Shared/{0}.vbhtml"
            };

            var modulesPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "bin");
            foreach (var file in Directory.EnumerateFiles(modulesPath, "EasyModules.NET.Modules.*.Web*.dll"))
            {
                var assembly = Assembly.LoadFile(file);
                var module = assembly.GetName().Name;

                masterLocationFormats.Add("~/Modules/" + module + "/Views/{1}/{0}.cshtml");
                masterLocationFormats.Add("~/Modules/" + module + "/Views/{1}/{0}.vbhtml");
                masterLocationFormats.Add("~/Modules/" + module + "/Views/Shared/{1}/{0}.cshtml");
                masterLocationFormats.Add("~/Modules/" + module + "/Views/Shared/{1}/{0}.vbhtml");

                partialViewLocationFormats.Add("~/Modules/" + module + "/Views/{1}/{0}.cshtml");
                partialViewLocationFormats.Add("~/Modules/" + module + "/Views/{1}/{0}.vbhtml");
                partialViewLocationFormats.Add("~/Modules/" + module + "/Views/Shared/{0}.cshtml");
                partialViewLocationFormats.Add("~/Modules/" + module + "/Views/Shared/{0}.vbhtml");

                areaViewAndPartialViewLocationFormats.Add("~/Modules/" + module + "/Views/{1}/{0}.cshtml");
                areaViewAndPartialViewLocationFormats.Add("~/Modules/" + module + "/Views/{1}/{0}.vbhtml");
                areaViewAndPartialViewLocationFormats.Add("~/Modules/" + module + "/{2}/Views/{1}/{0}.cshtml");
                areaViewAndPartialViewLocationFormats.Add("~/Modules/" + module + "/{2}/Views/{1}/{0}.vbhtml");
                areaViewAndPartialViewLocationFormats.Add("~/Modules/" + module + "/{2}/Views/Shared/{0}.cshtml");
                areaViewAndPartialViewLocationFormats.Add("~/Modules/" + module + "/{2}/Views/Shared/{0}.vbhtml");
            }

            ViewLocationFormats = partialViewLocationFormats.ToArray();
            MasterLocationFormats = masterLocationFormats.ToArray();
            PartialViewLocationFormats = partialViewLocationFormats.ToArray();
            AreaPartialViewLocationFormats = areaViewAndPartialViewLocationFormats.ToArray();
            AreaViewLocationFormats = areaViewAndPartialViewLocationFormats.ToArray();
        }
    }
}