"use client";

import { useEffect } from "react";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { clearMutation, createProduct, updateProduct } from "../lib/productsSlice";
import { productCategories, productSchema } from "../lib/productSchema";

const emptyProduct = {
  name: "",
  sku: "",
  category: "",
  price: "",
  stock: "",
  description: "",
};

export default function ProductForm({ product, mode = "create" }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { mutationStatus, mutationError } = useSelector((state) => state.products);
  const isSubmitting = mutationStatus === "loading";

  useEffect(() => () => dispatch(clearMutation()), [dispatch]);

  async function handleSubmit(values, { setSubmitting, setStatus }) {
    setStatus(null);
    const payload = {
      ...values,
      name: values.name.trim(),
      sku: values.sku.trim(),
      description: values.description.trim(),
      price: Number(values.price),
      stock: Number(values.stock),
    };
    const action = mode === "edit"
      ? await dispatch(updateProduct({ id: product.id, ...payload }))
      : await dispatch(createProduct(payload));
    if ((mode === "edit" ? updateProduct : createProduct).fulfilled.match(action)) {
      router.push("/products");
    } else {
      setStatus(action.payload || "Could not save product.");
    }
    setSubmitting(false);
  }

  return (
    <Formik
      initialValues={product ? {
        name: product.name || "",
        sku: product.sku || "",
        category: product.category || "",
        price: product.price ?? "",
        stock: product.stock ?? "",
        description: product.description || "",
      } : emptyProduct}
      validationSchema={productSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit: submit, status }) => (
        <Form noValidate onSubmit={submit} className="form-card">
          <h2 className="form-section-title">Product information</h2>
          {(status || (mutationStatus === "failed" && mutationError)) && (
            <Alert variant="danger" role="alert">{status || mutationError}</Alert>
          )}
          <Row className="g-3">
            <Col xs={12} md={7}>
              <Form.Group controlId="product-name">
                <Form.Label className="form-label">Product name <span className="text-danger">*</span></Form.Label>
                <Form.Control name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.name && Boolean(errors.name)} placeholder="e.g. Everyday Canvas Tote" autoFocus />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={5}>
              <Form.Group controlId="product-sku">
                <Form.Label className="form-label">SKU <span className="text-danger">*</span></Form.Label>
                <Form.Control name="sku" value={values.sku} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.sku && Boolean(errors.sku)} placeholder="e.g. ACC-001" />
                <Form.Control.Feedback type="invalid">{errors.sku}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group controlId="product-description">
                <Form.Label className="form-label">Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={values.description} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.description && Boolean(errors.description)} placeholder="Add a short description for this product" />
                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                <Form.Text>Optional. Keep it under 500 characters.</Form.Text>
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group controlId="product-category">
                <Form.Label className="form-label">Category <span className="text-danger">*</span></Form.Label>
                <Form.Select name="category" value={values.category} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.category && Boolean(errors.category)}>
                  <option value="">Select category</option>
                  {productCategories.map((category) => <option key={category} value={category}>{category}</option>)}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group controlId="product-price">
                <Form.Label className="form-label">Price (USD) <span className="text-danger">*</span></Form.Label>
                <Form.Control type="number" min="0" step="0.01" name="price" value={values.price} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.price && Boolean(errors.price)} placeholder="0.00" />
                <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group controlId="product-stock">
                <Form.Label className="form-label">Stock quantity <span className="text-danger">*</span></Form.Label>
                <Form.Control type="number" min="0" step="1" name="stock" value={values.stock} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.stock && Boolean(errors.stock)} placeholder="0" />
                <Form.Control.Feedback type="invalid">{errors.stock}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <div className="form-actions">
            <Button type="button" className="btn-light-custom" onClick={() => router.push("/products")} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" className="btn-brand" disabled={isSubmitting}>
              {isSubmitting && <Spinner size="sm" className="me-2" aria-hidden="true" />}
              {mode === "edit" ? "Save changes" : "Create product"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}