(module
 (type $i (func (result i32)))
 (import "env" "provided" (func $imported (result i32)))
 (import "env" "memory" (memory $0 0))
 (export "main" (func $main))
 (export "memory" (memory $0))
 (func $main (; 1 ;) (type $i) (result i32)
  (return
   (i32.const 0)
  )
 )
)
