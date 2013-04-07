using System.IO;
using System.Linq;
using System.Reflection;
using EasyModules.NET.Core.Web.Config;
using Ninject.Extensions.Conventions;
using Ninject.Syntax;
using System;
using System.Web;
using Microsoft.Web.Infrastructure.DynamicModuleHelper;
using Ninject;
using Ninject.Web.Common;

[assembly: WebActivator.PreApplicationStartMethod(typeof(NinjectWebCommon), "Start")]
[assembly: WebActivator.ApplicationShutdownMethodAttribute(typeof(NinjectWebCommon), "Stop")]

namespace EasyModules.NET.Core.Web.Config
{
    public static class NinjectWebCommon 
    {
        private static readonly Bootstrapper Bootstrapper = new Bootstrapper();

        /// <summary>
        /// Starts the application
        /// </summary>
        public static void Start() 
        {
            DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
            DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));
            Bootstrapper.Initialize(CreateKernel);
        }
        
        /// <summary>
        /// Stops the application.
        /// </summary>
        public static void Stop()
        {
            Bootstrapper.ShutDown();
        }
        
        /// <summary>
        /// Creates the kernel that will manage your application.
        /// </summary>
        /// <returns>The created kernel.</returns>
        private static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
            kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();
            
            RegisterServices(kernel);
            return kernel;
        }

        /// <summary>
        /// Load your modules or register your services here!
        /// </summary>
        /// <param name="kernel">The kernel.</param>
        private static void RegisterServices(IBindingRoot kernel)
        {
            // using System.IO;
            // using Ninject.Extensions.Conventions;
            // bind modules assemblies in bin folder
            var path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "bin");
            kernel.Bind(a => a.FromAssembliesInPath(path).SelectAllClasses().BindDefaultInterface());

        }
        public static Assembly AssemblyResolve(object sender, ResolveEventArgs resolveArgs)
        {
            var currentAssemblies = AppDomain.CurrentDomain.GetAssemblies();
            // Check we don't already have the assembly loaded
            return currentAssemblies.FirstOrDefault(assembly => assembly.FullName == resolveArgs.Name || assembly.GetName().Name == resolveArgs.Name);
        }
    }
}
